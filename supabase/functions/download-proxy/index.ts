import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const accessToken = url.searchParams.get('token');

    if (!accessToken) {
      return new Response(
        JSON.stringify({ error: 'Access token is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Initialize Supabase client with service role
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get link data
    const { data: linkData, error: linkError } = await supabase
      .from('links')
      .select('*')
      .eq('access_token', accessToken)
      .single();

    if (linkError || !linkData) {
      return new Response(
        JSON.stringify({ error: 'File not found or expired' }),
        { 
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if expired
    const now = new Date();
    const expiresAt = new Date(linkData.expires_at);
    
    if (now > expiresAt || (linkData.first_view && linkData.viewed_at)) {
      return new Response(
        JSON.stringify({ error: 'File has expired' }),
        { 
          status: 410,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Get the file from storage
    const { data: fileData, error: storageError } = await supabase.storage
      .from('ephemeral')
      .download(linkData.object_path);

    if (storageError || !fileData) {
      return new Response(
        JSON.stringify({ error: 'Failed to retrieve file' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // If first view, mark as viewed and expire immediately
    if (linkData.first_view) {
      await supabase
        .from('links')
        .update({
          viewed_at: new Date().toISOString(),
          expires_at: new Date().toISOString(),
        })
        .eq('id', linkData.id);

      // Delete the file from storage after marking as viewed
      setTimeout(async () => {
        await supabase.storage
          .from('ephemeral')
          .remove([linkData.object_path]);
      }, 5000); // 5 second delay to allow download to complete
    }

    // Return the file with appropriate headers
    const headers = {
      ...corsHeaders,
      'Content-Type': linkData.mime_type || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${linkData.filename}"`,
      'Content-Length': linkData.size_bytes.toString(),
    };

    return new Response(fileData, { headers });

  } catch (error) {
    console.error('Download proxy error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});