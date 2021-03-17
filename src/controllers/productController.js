const dbs = require('../config/database');

const { query, client } = dbs;

module.exports = {

    async index(req, res) {

        const response = await query(
            'SELECT * FROM products ORDER BY p_name ASC'
        );

        res.status(200).send({ products: response.rows });
    },

    async show(req, res) {

        const { id } = req.params;

        client.get(id, async (err, reply) => {
            if (reply != null) {

                const value = JSON.parse(reply.toString());
                return res.status(200).send({ product: value });

            } else {

                const response = await query(
                    'SELECT * FROM products WHERE code = $1',
                    [id]
                );

                if (response.rows[0]) {

                    const value = response.rows[0];
                    client.setex(id, (60 * 60), JSON.stringify(value));

                    return res.status(200).send({ product: value });

                } else {

                    return res.status(400).send({ product: null });

                }

            }
        })
    },

    async store(req, res) {

        const { code, p_name, quantity, price } = req.body;

        await query(
            'INSERT INTO products (code, p_name, quantity, price) VALUES ($1, $2, $3, $4)',
            [code, p_name, quantity, price]
        );

        res.status(201).send({
            message: "Produto adicionado!",
            body: {
                product: { code, p_name, quantity, price }
            },
        });
    },

    async update(req, res) {

        const { id } = req.params;
        const { code, p_name, quantity, price } = req.body;

        const { rows } = await query(
            'UPDATE products SET code = $1, p_name = $2, quantity = $3, price = $4 WHERE code = $5',
            [code, p_name, quantity, price, id]
        );

        res.status(200).send({ message: "Produto atualizado!", product: rows });
    },

    async destroy(req, res) {

        const { id } = req.params;

        client.get(id, async (err, reply) => {
            if (reply != null) {

                client.del(id);

            }
        });

        await query(
            'DELETE FROM products WHERE code = $1',
            [id]
        );

        return res.status(200).send({ message: "Produto excluido!" });
    },
};