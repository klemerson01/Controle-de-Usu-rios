const connection = require("../database/connection");
var User = require("../../models/User");

let UserClass = class {
  constructor(props) {
    this.props = props;
  }
};

module.exports = {
  // async create(req, res) {
  //   const response = { ...responseModel };

  //   const { username, password } = req.body;

  //   const [, affectRows] = await connection.query(`
  //           INSERT INTO users VALUES (DEFAULT, '${username}', '${password}', NOW(), NOW())
  //       `);

  //   response.success = affectRows > 0;

  //   return res.json(response);
  // },
  async create(req, res) {
    const [user, created] = await User.findOrCreate({
      where: { username: req.body.username, password: req.body.password },
      defaults: {},
    });

    delete user.dataValues.password;

    return res.json(user);
  },

  // async login(req, res) {
  //   const response = { ...responseModel };

  //   const { username, password } = req.body;

  //   const [, data] = await connection.query(`
  //           SELECT * FROM users WHERE username='${username}' AND password='${password}'
  //       `);

  //   response.success = data.length > 0;

  //   return res.json(response);
  // },

  async login(req, res) {
    // const usernameBody = req.body.username;
    // const passwordBody = req.body.password;

    const data = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
      where: { username: req.body.username, password: req.body.password },
    });
    return res.json(200, data);
  },

  // async getAll(req, res) {
  //     const response = {...responseModel}
  //     const [, data] = await connection.query('SELECT * FROM users', (err, rows, fields) => {
  //         if (err)
  //         console.log(err);
  //     })
  //     response.success = data.length > 0
  //     console.log(data[0])
  //     delete data.password;
  //     return res.json(data)
  // },

  async getAll(req, res) {
    const data = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    console.log(data);
    return res.json(200, data);
  },

  // async getOne(req, res) {
  //   if (req.params.id == undefined) {
  //     return res.json({});
  //   }
  //   if (req.params.id != Number) {
  //     return res.status(500).json({});
  //   }
  //   const pnId = req.params.id;

  //   const response = { ...responseModel };
  //   const [, data] = await connection.query(
  //     "SELECT * FROM users WHERE id = " + pnId,
  //     (err, rows, fields) => {
  //       if (err) {
  //         return res.status(500).json({});
  //       }
  //     }
  //   );
  //   response.success = data.length > 0;

  //   if (!response.success) {
  //     return res.status(404).json({});
  //   }
  //   console.log(data);
  //   return res.json(data);
  //   return res.json({});
  // },

  async getOne(req, res) {
    const pnId = req.params.id;
    if (pnId == undefined) {
      return res.status(404).json({});
    }

    const data = await User.findByPk(pnId, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (data == null) {
      return res.json(404, {});
    }

    return res.json(200, data);
  },

  async Update(req, res) {
    const pnId = req.params.id;
    const poBody = req.body;
    const teste = new UserClass({ ...poBody });
    console.log(teste);
    if (pnId == undefined) {
      res.json(404);
    }
    await User.update(
      {
        ...teste.props,
      },
      {
        where: { id: pnId },
      }
    );
    return res.json(200);
  },

  async Delete(req, res) {
    const pnId = req.params.id;
    if (pnId == undefined) {
      return res.status(404).json({});
    }

    const data = await User.findByPk(pnId, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (data == null) {
      return res.json(404, {});
    }

    var testeDelete = await User.destroy({ where: { id: pnId } });

    console.log(testeDelete);

    return res.json(200, {});
  },
};
