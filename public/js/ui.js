$(function() {
   initErrorProcessing();

   $("#render").click(function () {
       renderText();
   });

   $('.examples li a').click(function(){
       var val = $(this).parent().find('pre').text();
       $('#diagram').val(val);
       renderText();
   });

   $('#download').click(function(){
       html2canvas($("#result")[0]).then(function(canvas) {
           document.body.appendChild(canvas);
       });
   });
});

function renderText() {
    var d = $('#diagram').val();
    if (d.indexOf('\\begin') < 0) {
        d = "\\begin{xy}\n\\xymatrix {\n" + d + "\n}\n\\end{xy}"
    }
    $('#result').html(d);
    MathJax.Hub.Typeset();
}

function initErrorProcessing() {
    var oldOnError = window.onerror;
    window.onerror = function (errorMsg, url, lineNumber) {
        $("div#errors").html(errorMsg + "<br/>@ " + url + " " + lineNumber);
        if (oldOnError)
            oldOnError(errorMsg, url, lineNumber);
    };

}