<failure>
  <div id="opp_container">
      <div class="opp_error-card">
        <h1>Not Found</h1>
        <div class="opp_body">
            <p> Unfortunately we could not find any information about this asset.</p>
        </div>
        <div class="opp_footer">
            <p> If this asset belongs to you and you would like to know more about registering it with the Open Permissions Platform,
            please contact <a href="mailto:support@openpermissions.org" target="_top">OPP Support</a> for more information.</p>
        </div>
        <div class="opp_footer-logo">
          <p>Powered by </p> <img src="https://s3-eu-west-1.amazonaws.com/copyrighthub-matrix-images/opp-logo.png"></img>
        </div>
      </div>
  </div>
</failure>

<error>
  <div id="opp_container">
      <div class="opp_error-card">
        <h1> Error </h1>
        <div class="opp_body">
                <p> Unfortunately there was a problem retrieving information for this asset. It may work if you try again.<p>
                <p>Alternatively, please contact <a href="mailto:support@openpermissions.org" target="_top">OPP Support</a>
                for help with further troubleshooting.</p>


            <div>
                <input class="opp_collapse" id="error" type="checkbox" >
                <label for="error">Error Message</label>
                <div class="opp_collapse-body">
                    <pre>
                        <code>
                            {JSON.stringify(opts.error, ["message", "arguments", "type", "name", "status", "errors"], 4)}
                        </code>
                    </pre>
                </div>
            </div>
        </div>

        <div class="opp_footer-logo">
          <p>Powered by </p> <img src="https://s3-eu-west-1.amazonaws.com/copyrighthub-matrix-images/opp-logo.png"></img>
        </div>
      </div>
  </div>
  <style>
    .opp_error-card {
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

    .opp_error-card h1 {
      background: #DADFE1;
      border-bottom: solid 1px;
      border-color: #6C7A89;
      padding-left:10px;
    }

    .opp_error-card a {
        color: #737373;
    }

    .opp_error-card .opp_body {
        margin: 0 20px;
    }

    .opp_error-card .opp_footer {
        font-size: 12px;
        margin: 0 20px;
    }

    .opp_collapse {
      display: none;
    }

    .opp_collapse + label {
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

    .opp_collapse + label + .opp_collapse-body {
      display: none;
    }

    .opp_collapse:checked + label + .opp_collapse-body {
      display: block;
    }

    .opp_collapse + label:before {
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

    .opp_collapse:checked + label:before {
      content:"\25BC";
    }

    .opp_collapse-body{
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