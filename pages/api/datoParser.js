import { SiteClient } from 'datocms-client';
const datoClient = new SiteClient(process.env.NEXT_PUBLIC_RO_DATOCMS_API_SECRET);

export default async function requestHandler(req, res) {
        const data = await datoClient.items.all({
            filter: {
                id: id
            }
        });
        res.json({
            data: data,
        });

        return;
    // res.status(405).json({
    //     error: `method not allowed (${req.method})`,
    //     status: '405'
    // })
}