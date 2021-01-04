---
title: QRコード作成
date: 2021-01-02T19:52:15+09:00
description: QRコードを作成できるページです
draft: false
---

# QRコード作成

{{< rawhtml >}}

<div style="max-width: 750px; margin: 10px auto">
  <form id="form">
    <div class="input-group">
      <input
        type="url"
        id="url"
        class="form-control"
        placeholder="QRコードにしたいURLを入力"
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

  <div id="result" style="text-align: center; display: none"></div>
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
  document.getElementById('submit').onclick = e => {
    const width = '250';
    if (!document.getElementById('form').checkValidity()) {
      return;
    }

    e.preventDefault();

    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    
    document.getElementById(
      'result'
    ).innerHTML = `<img src="${`https://chart.apis.google.com/chart?cht=qr&chs=${width}x${width}&chl=${encodeURI(
      document.getElementById('url').value
    )}`}" width="${width}"/>`;

    document.getElementById('url').value = '';
    document.getElementById('result').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  };
</script>

{{< /rawhtml >}}
