@isTest
public class TestTurnTheVoiceController {
    @isTest(SeeAllData=true)
    public static void testcreateContentNote() {
        TurnTheVoiceController.createContentNote('件名', 'コンテンツ');
    }
}
