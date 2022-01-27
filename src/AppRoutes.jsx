import React, { PureComponent } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Cart, Category, Product } from 'pages';

export default class AppRouter extends PureComponent {
  render() {
    return (
      <Routes>
        <Route exact path="/" element={<Category />} />
        <Route exact path="/product/:productId" element={<Product />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route path="*" element={<Navigate t0="/" />} />
      </Routes>
    );
  }
}
