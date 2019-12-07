public with sharing class TurnTheVoiceController {
    @AuraEnabled
    public static void createContentNote(String title, String content){
        ContentNote cn = new ContentNote();
        cn.Title = title;
        cn.Content = Blob.valueOf(content.escapeHtml4());
        insert(cn);
    }
}
