const {app} = require('./app');


// Models
const { User } = require('./models/user.model');
const { Order } = require('./models/order.model');
const { Restaurant } = require('./models/restaurant.model');
const { Meal } = require('./models/meal.model');
const { Review } = require('./models/review.model');






//utils
const {db} = require('./utils/database.util');


db.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));

// Establish model's relations
User.hasMany(Review, { foreignKey: 'userId' });
	Review.belongsTo(User);

	Order.belongsToMany(Restaurant, { through: 'OrderRestaurant' });
	Restaurant.belongsToMany(Order, { through: 'OrderRestaurant' });

	Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
	Review.belongsTo(Restaurant);

	Meal.hasMany(Order, { foreignKey: 'mealId' });
	Order.belongsTo(Meal);

	User.hasMany(Order, { foreignKey: 'userId' });
	Order.belongsTo(User);

	Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
	Meal.belongsTo(Restaurant);


	
	

db.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log('Express app running!!', PORT);
});
