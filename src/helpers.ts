const extractChapterFromMarkdown = (
  markdown: string,
  startHeading: string,
  endHeading?: string
): string => {
  const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  const startPattern = escapeRegex(startHeading)
  const endPattern = endHeading ? escapeRegex(endHeading) : null

  const regex = endPattern
    ? new RegExp(`${startPattern}([\\s\\S]*?)${endPattern}`, 'm')
    : new RegExp(`${startPattern}([\\s\\S]*)`, 'm')

  const match = regex.exec(markdown)
  return match ? match[1].trim() : ''
}

export { extractChapterFromMarkdown }
