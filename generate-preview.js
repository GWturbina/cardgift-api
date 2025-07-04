export default function handler(req, res) {
    // Разрешаем CORS
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
        console.log('📤 Получена карта:', cardData?.cardId);
        
        // Генерируем URL превью
        const previewUrl = `https://gwturbina.github.io/cardgift-api/preview.html?id=${cardData.cardId}`;
        const mockImageUrl = `https://via.placeholder.com/1200x630/667eea/ffffff?text=CardGift+Preview`;
        
        return res.status(200).json({
            success: true,
            shareableUrl: previewUrl,
            previewImageUrl: mockImageUrl,
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
