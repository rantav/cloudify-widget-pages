var postUrl = null;
function start() {
  NProgress.start();
  var iframe = $("#iframe");
  var postObj = {name: 'play_widget'};
  $.postMessage(JSON.stringify(postObj), postUrl, iframe.get(0).contentWindow);
}
function stop() {
  var iframe = $("#iframe");
  $.postMessage(JSON.stringify({name: 'stop_widget'}), postUrl, iframe.get(0).contentWindow);
  updateManageUrl();
  updateUseUrl();
  updateTtyUrl();
}
function updateButtonState(state) {
  if (state == 'RUNNING') {
    $('#launch').data('launched', true).
        html("<span class='glyphicon glyphicon-stop'></span> Stop");
    $('.panel').show(200);
  } else if (state == 'STOPPED') {
    NProgress.done();
    $('#launch').data('launched', false).
        html("<span class='glyphicon glyphicon-play'></span> Launch Now");
  }
}

function updateLog(logLines) {
  $('#log').html(logLines.join('\n'));
}
function appendLog(line) {
  $('#log').append(('\n') + line);
}

function updateUseUrl(url, title) {
  var $use = $('#use');
  updateActionButton($use, url);
}
function updateManageUrl(url) {
  updateActionButton($('#manage'), url);
}
function updateTtyUrl(url) {
  var $tty = $('#tty');
  if ($tty) {
    updateActionButton($tty, url);
  }
}
function updateActionButton($elm, url) {
  $elm.attr('href', url);
  if (url) {
    $elm.removeClass('disabled');
  } else {
    $elm.addClass('disabled');
  }
}
function updateTimeLeft(minutes) {
  $('#time-left').html(minutes);
}

$(function() {
  var src = 'http://launch.cloudifysource.org/widget/widget?' +
    'apiKey=' + WIDGET_ID +
    '&title=Launch' +
    '&origin_page_url=' + document.location.href;
  postUrl = src;
  var html = '<iframe id="iframe" src="' + src + '" width="600" height="463"></iframe>';
  $('#hidden-iframe').html(html);

  $('#launch').click(function() {
    if ($('#launch').data('launched')) {
      stop();
    } else {
      start();
    }
  });

  $.receiveMessage(function(e) {
    try {
      var msg = JSON.parse(e.data);
      var $log = $("#log");

      if (msg.name == 'write_log') {
        $log.append($("<li/>", {html: msg.html}).addClass(msg.className));
        $log.scrollTop($log[0].scrollHeight);
      } else if (msg.name == "widget_status") {
        updateButtonState(msg.status.state);

        console.log(msg.status);
        updateTimeLeft(msg.status.timeleft);
        updateManageUrl('http://' + msg.status.publicIp + ':8099/');
        if (msg.status.consoleLink) {
          updateUseUrl(msg.status.consoleLink.url, msg.status.consoleLink.title);
          updateTtyUrl('http://' + msg.status.publicIp + ':8080/');
          NProgress.done();
        } else {
          updateTtyUrl();
          updateUseUrl();
        }

        updateLog(msg.status.output);
      } else if (msg.name == "stop_widget") {
        updateButtonState('STOPPED');
        appendLog('STOPPED');
        updateUseUrl();
        updateTtyUrl();
        updateManageUrl();
      }
    } catch (exception) {
      console.log(["problem receiving message... ", e, exception]);
    }
  }, function(origin) {
    return true;
  });
});
