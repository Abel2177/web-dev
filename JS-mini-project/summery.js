import { withVat, format, calculateItemTotal } from './prciing.js';
import { orders } from './order.js';

const generateSummary = () => {

  const ordersWithTotals = orders.map(order => {
    const orderTotal = order.items.reduce((sum, item) => {
      const { price, qty } = item;
      return sum + calculateItemTotal(price, qty);
    }, 0);

    return {
      ...order,
      total: orderTotal
    };
  });

  const highValueOrders = ordersWithTotals.filter(order => order.total > 500);


  
  ordersWithTotals.forEach(order => {
    console.log(`Order #${order.id} - ${order.customer}`);
    console.log('  Items:');
    
    order.items.forEach(item => {
      const itemTotal = calculateItemTotal(item.price, item.qty);
      console.log(`    • ${item.name}: ${item.qty} × ${format(withVat(item.price))} = ${format(itemTotal)}`);
    });
    
    console.log(`  Order Total: ${format(order.total)}`);
    console.log('-'.repeat(40));
  });

  console.log('\n');

  
  if (highValueOrders.length === 0) {
    console.log('  No orders over 500 ETB');
  } else {
    highValueOrders.forEach(order => {
      console.log(`Order #${order.id} - ${order.customer}: ${format(order.total)}`);
    });
  }

  const grandTotal = ordersWithTotals.reduce((sum, order) => sum + order.total, 0);
  
  console.log(`  All orders total: ${format(grandTotal)}`);
  console.log(`  Total orders: ${ordersWithTotals.length}`);
  console.log(`  High-value orders (over 500 ETB): ${highValueOrders.length}`);
};

generateSummary();

export { generateSummary };