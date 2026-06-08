const { MercadoPagoConfig, Preference } = require('mercadopago')

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { items } = req.body
    if (!items || !items.length) {
      return res.status(400).json({ error: 'No hay ítems en el carrito' })
    }

    const invalidItems = items.filter(i => !i.price || Number(i.price) <= 0)
    if (invalidItems.length) {
      return res.status(400).json({ error: 'Todos los servicios deben tener un precio mayor a 0' })
    }

    const protocol = 'https'
    const host = req.headers['x-forwarded-host'] || req.headers.host
    const baseUrl = `${protocol}://${host}`

    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN })
    const preferenceClient = new Preference(client)

    const result = await preferenceClient.create({
      body: {
        items: items.map(item => ({
          id: String(item.id),
          title: item.title,
          unit_price: Number(item.price),
          quantity: 1,
          currency_id: 'ARS'
        })),
        back_urls: {
          success: `${baseUrl}/pago-exitoso`,
          failure: `${baseUrl}/pago-fallido`,
          pending: `${baseUrl}/pago-exitoso`
        },
        auto_return: 'approved'
      }
    })

    res.status(200).json({ init_point: result.init_point })
  } catch (err) {
    console.error('MercadoPago error:', err)
    res.status(500).json({ error: err.message || 'Error al crear la preferencia de pago' })
  }
}
