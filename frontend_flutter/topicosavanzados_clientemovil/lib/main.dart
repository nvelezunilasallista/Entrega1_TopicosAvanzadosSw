
import 'package:flutter/material.dart';
import 'package:topicosavanzados_clientemovil/login.dart';
import 'package:topicosavanzados_clientemovil/sellerList.dart';

void main() {
  runApp(
    MaterialApp(routes:{
      "/": (BuildContext context) => Login(),
      "/list": (BuildContext context) => SellerList()
    })
  );
}