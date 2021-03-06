import { SiteClient } from 'datocms-client';
const datoClient = new SiteClient(process.env.DATO_FA_API_KEY);

export default async function requestHandler(req, res) {
    if (req.method === 'POST') {
        var { name, image, creatorSlug } = { name: '', image: '', creatorSlug: '', ...req.body }
        const newCommunity = await datoClient.items.create({
            itemType: '967613',
            name: name,
            image: image,
            creatorSlug: creatorSlug,
        });
        res.json({
            newCommunity: newCommunity,
        });

        return;
    }
    res.status(405).json({
        error: `method not allowed (${req.method})`,
        status: '405'
    })
}