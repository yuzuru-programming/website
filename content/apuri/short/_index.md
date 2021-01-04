---
title: 短縮URL作成
date: 2021-01-01T00:52:15+09:00
description: 短縮URLを作成できるページです
draft: false
---

# 短縮URL作成

{{< rawhtml >}}
<div style="max-width: 750px; margin: 10px auto">
  <form id="form">
    <div class="input-group">
      <input
        type="url"
        id="url"
        class="form-control"
        placeholder="短縮したいURLを入力"
        required
      />
      <div class="input-group-append">
        <input
          type="submit"
          class="btn btn-success"
          id="submit"
          value="作成"
        />
      </div>
    </div>
  </form>

  <br />

  <!-- ローディング -->
  <div id="loading" style="display: none">
    <div
      class="d-flex align-items-center justify-content-center"
    >
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
  <!-- ローディング -->

  <!-- 結果 -->
  <div id="result" style="text-align: center; display: none">
    <div class="input-group">
      <input
        type="text"
        id="output"
        class="form-control"
        disabled
        placeholder="短縮URL"
      />
      <div class="input-group-append">
        <button id="copy" class="btn btn-primary" type="button">
          コピー
        </button>
      </div>
    </div>
  </div>
  <!-- 結果 -->
</div>

<script
  src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"
  integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU"
  crossorigin="anonymous"
></script>
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js"
  integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj"
  crossorigin="anonymous"
></script>

<script>
  // submit
  document.getElementById('submit').onclick = e => {
    const MY_DOMAIN = 'https://odbri1u2.page.link';
    const API_KEY = 'AIzaSyB8olQXWPvTu9nehgWClS7PZzRLKUrqEtw';

    if (!document.getElementById('form').checkValidity()) {
      return;
    }

    e.preventDefault();

    document.getElementById('result').style.display = 'none';
    document.getElementById('loading').style.display = 'block';

    // apiたたく
    fetch(
      'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=' +
        API_KEY,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          longDynamicLink:
            MY_DOMAIN + '/?link=' + document.getElementById('url').value,
          suffix: {
            option: 'SHORT',
          },
        }),
      }
    ).then(res => {
      res.json().then(json => {
        document.getElementById('output').value = json['shortLink'];
        document.getElementById('url').value = '';
        document.getElementById('result').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
      });
    });
  };

  // copy
  document.getElementById('copy').onclick = () => {
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      var txtPassword = document.getElementById("output");
      var range = document.createRange();
      range.selectNode(txtPassword);
      window.getSelection().addRange(range);
      document.execCommand('copy');
      alert("コピーしました。");
      return;
    }

    const listener = e => {
      e.clipboardData.setData(
        'text/plain',
        document.getElementById('output').value
      );

      e.preventDefault();
      document.removeEventListener('copy', listener);
      alert('コピーしました');
    };
    document.addEventListener('copy', listener);
    document.execCommand('copy');
  };
</script>
{{< /rawhtml >}}