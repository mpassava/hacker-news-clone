export default function Comment(comment) {
    console.log(comment);
    return `
        <div class="nested-comments-0">
            <p class="comment-header">
                ${comment.by} | ${comment.id}
            </p>
            ${comment.text}
        </div>
    `
}
