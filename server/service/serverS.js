import path from 'path';

export function getContentType(filePath) {
    // Get the file extension from the path
    const ext = path.extname(filePath).toLowerCase();

    // MIME type mappings based on file extensions
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.json': 'application/json',
        '.ico': 'image/x-icon',
        '.txt': 'text/plain',
        '.pdf': 'application/pdf',
        '.mp4': 'video/mp4',
        '.mp3': 'audio/mp3',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.otf': 'font/otf',
        '.ttf': 'font/ttf',
    };

    // Return the MIME type for the file extension, or default to 'application/octet-stream' if not found
    return mimeTypes[ext] || 'application/octet-stream';
}