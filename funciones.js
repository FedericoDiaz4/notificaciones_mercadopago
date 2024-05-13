const getId = (idsMerchantOrders) => {
  if (idsMerchantOrders.length > 0) {
    const idResponse = idsMerchantOrdersCaja1[0];
    return { id: idResponse };
  } else {
    return null;
  }
};

const deleteId = (idsMerchantOrders) => {
  if (idsMerchantOrders.length > 0) {
    const idDeleted = idsMerchantOrders.slice(0, 1);
    return { id: idDeleted };
  } else {
    return null;
  }
};

export { getId, deleteId };
