/**
 * Converts HTML content to Markdown format
 */
function htmlToMarkdown(html: string): string {
    let markdown = html;

    // Replace bold tags
    markdown = markdown.replace(/<b>(.*?)<\/b>/gi, '**$1**');
    markdown = markdown.replace(/<strong>(.*?)<\/strong>/gi, '**$1**');

    // Replace italic tags
    markdown = markdown.replace(/<i>(.*?)<\/i>/gi, '*$1*');
    markdown = markdown.replace(/<em>(.*?)<\/em>/gi, '*$1*');

    // Replace strikethrough tags
    markdown = markdown.replace(/<del>(.*?)<\/del>/gi, '~$1~');
    markdown = markdown.replace(/<s>(.*?)<\/s>/gi, '~$1~');

    // Replace code tags
    markdown = markdown.replace(/<code>(.*?)<\/code>/gi, '`$1`');

    // Replace line breaks
    markdown = markdown.replace(/<br\s*\/?>/gi, '\n');

    // Remove remaining HTML tags
    markdown = markdown.replace(/<[^>]+>/g, '');

    return markdown;
}

export {htmlToMarkdown};