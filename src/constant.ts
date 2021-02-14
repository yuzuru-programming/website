export class Constant {
  constructor() {
    throw new Error('');
  }

  static get url() {
    return 'https://itsumen.com';
  }

  // ブログタイトル
  static get title() {
    return 'いつめんドットコム';
  }

  // description
  static get description() {
    return 'プログラミングに関する知識を記録・共有するためのサービスです。\nコードを書いていて気づいたことや、ハマった仕様について、知見を共有しましょう。';
  }

  // ページネーションで何件ずつ表示するか
  static get pagenate() {
    return 5;
  }

  // コード共有ページ
  static get code() {
    return {
      lang: [
        'html',
        'css',
        'javascript',
        'python',
        'php',
        'go',
        'java',
        'c',
        'rust',
        'perl',
        'bash',
        'swift',
        'ruby',
        'c++',
        'c#',
        'json',
        'sql',
        'yaml',
        'less',
        'scss',
        'typescript',
        'markdown',
        'kotlin',
        'plaintext',
      ],
    };
  }
}
