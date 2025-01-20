module.exports = {
  semi: false,
  singleQuote: true,
  htmlWhitespaceSensitivity: 'ignore',
  overrides: [
    {
      files: '*.md',
      options: {
        parser: 'markdown', // 确保使用 Markdown 解析器
        proseWrap: 'preserve', // 保留原始换行
      },
    },
  ],
}
