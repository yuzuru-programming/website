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
}
