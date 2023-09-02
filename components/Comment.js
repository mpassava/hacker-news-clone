export default function Comment(comment) {
    console.log(comment);
    const hasNestedComments = comment.comments;

    return `
        <div class="nested-comments-${comment.level}">
            <p class="comment-header">
                ${comment.by} | ${comment.id}
            </p>
            ${comment.text}
            ${hasNestedComments ? comment.comments.map(comment => Comment(comment)).join('') : ''}
        </div>
    `
}
