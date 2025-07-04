export default async function handler(req, res) {
    // Разрешаем CORS для всех доменов
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const cardData = req.body;
        
        // Пока возвращаем мок-данные
        const mockPreviewUrl = `https://${req.headers.host}/previews/card_${cardData.cardId}_preview.jpg`;
        const shareUrl = `https://cardgift.bnb/card-viewer.html?id=${cardData.cardId}`;
        
        console.log('📤 Получена карта:', cardData.cardId);
        
        return res.status(200).json({
            success: true,
            shareableUrl: shareUrl,
            previewImageUrl: mockPreviewUrl,
            cardId: cardData.cardId
        });
        
    } catch (error) {
        console.error('❌ Ошибка API:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}