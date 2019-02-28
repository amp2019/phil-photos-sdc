# Photo Carousel Server

> Database and Server Information for the Xillow Photo Carousel

## Related Projects

  - https://github.com/amp2019/mandy-home-value-module
  - https://github.com/amp2019/contact-agent-module
  - https://github.com/amp2019/phil-proxy
  - https://github.com/amp2019/home-value-proxy
  - https://github.com/amp2019/andy-proxy

## Routes


Property Table Structure
```

  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  bed_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  bath_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  sq_ft: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

```

Photos Table Structure
```
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  property_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

```
GET Property Route
'/api/basicdetails/:propertyId'
```
{
  :propertyId = id
}

```

Get Photos Route
'/api/full/photos/:propertyId'
'/api/thumb/photos/:propertyId'
```
{
  :propertyId = fk to property's id
}
```


POST New Property
'/api/newProperty

```
{
  id: (auto generated)
  name: _
  price: _
  bed_count: _
  bath_count: _
  sq_ft: _
}

{
  id: (auto generated)
  url: _
  property_id: (fk to id of property)
}
```

PUT Property
```
{
  id: (auto generated)
  name: _
  price: _
  bed_count: _
  bath_count: _
  sq_ft: _
}

{
  id: (auto generated)
  url: _
  property_id: (fk to id of property)
}
```

Delete Property
```
{
  id: _
}
```