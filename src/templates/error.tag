<failure>
  <div id="container">
      <div class="error_card">
        <h1>Not Found</h1>
        <div class="body">
            <p> Unfortunately we could not find any information about this asset.</p>
        </div>
        <div class="footer">
            <p> If this asset belongs to you and you would like to know more about registering it with the Open Permissions Platform,
            please contact <a href="mailto:support@openpermissions.org" target="_top">OPP Support</a> for more information.</p>
        </div>
        <div class="footer-logo">
          <p>Powered by </p> <img src="../src/templates/logos/opp-logo.png"></img>
        </div>
      </div>
  </div>
</failure>

<error>
  <div id="container">
      <div class="error_card">
        <h1> Error </h1>
        <div class="body">
                <p> Unfortunately there was a problem retrieving information for this asset. It may work if you try again.<p>
                <p>Alternatively, please contact <a href="mailto:support@openpermissions.org" target="_top">OPP Support</a>
                for help with further troubleshooting.</p>


            <div>
                <input class="collapse" id="error" type="checkbox" >
                <label for="error">Error Message</label>
                <div class="collapse-body">
                    <pre>
                        <code>
                            {JSON.stringify(opts.error, ["message", "arguments", "type", "name", "status", "errors"], 4)}
                        </code>
                    </pre>
                </div>
            </div>
        </div>

        <div class="footer-logo">
          <p>Powered by </p> <img src="../src/templates/logos/opp-logo.png"></img>
        </div>
      </div>
  </div>
  <style>
    .error_card {
      font-family: 'Signika', sans-serif;
      position:relative;
      width:80%;
      margin:auto;
      height:400px;
      background: #fff;

      -webkit-box-shadow: 2px 2px 9px rgba(0,0,0,0.3);
         -moz-box-shadow: 2px 2px 9px rgba(0,0,0,0.3);
              box-shadow: 2px 2px 9px rgba(0,0,0,0.3);
    }

    .error_card h1 {
      background: #DADFE1;
      border-bottom: solid 1px;
      border-color: #6C7A89;
      padding-left:10px;
    }

    .error_card a {
        color: #737373;
    }

    .error_card .body {
        margin: 0 20px;
    }

    .error_card .footer {
        font-size: 12px;
        margin: 0 20px;
    }

    .collapse {
      display: none;
    }

    .collapse + label {
      background: #DADFE1;
      border: 1px solid #6C7A89;
      padding: 2px;
      cursor: pointer;
      display: block;
      font-weight: bold;
      line-height: 21px;
      -webkit-box-shadow: 2px 2px 9px rgba(0,0,0,0.3);
         -moz-box-shadow: 2px 2px 9px rgba(0,0,0,0.3);
              box-shadow: 2px 2px 9px rgba(0,0,0,0.3);
    }

    .collapse + label + .collapse-body {
      display: none;
    }

    .collapse:checked + label + .collapse-body {
      display: block;
    }

    .collapse + label:before {
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      content: "\25B6";
      display: block;
      float: left;
      font-weight: bold;
      height: 20px;
      line-height: 20px;
      text-align: center;
      width: 20px;
      margin-right: 5px;
    }

    .collapse:checked + label:before {
      content:"\25BC";
    }

    .collapse-body{
      height: 200px;
      overflow: auto;
      background: #eee;
      border: 1px solid #6C7A89;

      -webkit-box-shadow: 2px 2px 9px rgba(0,0,0,0.3);
         -moz-box-shadow: 2px 2px 9px rgba(0,0,0,0.3);
              box-shadow: 2px 2px 9px rgba(0,0,0,0.3);
    }
  </style>
</error>