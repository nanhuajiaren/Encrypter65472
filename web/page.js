$(document).ready(()=>{
    $("#button_clear").click(()=>{
        $("textarea").val("");
    });
    $("#button_encrypt").click(()=>{
        var original = $("textarea").val();
        if(original){
            $("pre").html(generateEncryptedScript(original));
        }
    });
    new ClipboardJS(".button");
});