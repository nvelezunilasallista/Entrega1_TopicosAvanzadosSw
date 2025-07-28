
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:topicosavanzados_clientemovil/sellerModel.dart';

import 'dart:async';

import 'package:topicosavanzados_clientemovil/sellerProvider.dart';


class SellerList extends StatefulWidget{
  @override
  State<StatefulWidget> createState(){
    return _SellerList();
  }
}

class _SellerList extends State<SellerList>{
  bool showError = false;
  SellerProvider provider = SellerProvider();
  List<Widget> sellerCards = <Widget>[];
  List<SellerModel> sellers = <SellerModel>[];

  @override
  void initState(){

    sellerCards = <Widget>[ 
        Visibility(
              child: Text("No se puede mostrar esta información", 
              style: TextStyle(fontWeight: FontWeight.bold, color:  Colors.redAccent),),
              visible: showError
            )
        ];
  }

  @override
  Widget build(BuildContext context) {
    getSellers();
    return Scaffold(
      appBar: AppBar(title: Text("Vendedores por autorizar")),
      body: ListView(
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: sellerCards,
          )
        ],
      )
    );
  }

  getSellers() async{
    
    try{
      String rawResponse = await provider.getUnauthorizedSellers();

      sellers = parseUsers(rawResponse);

      List<Widget> vendedoresAMostrar = <Widget>[];
      
      
      for(int i = 0; i < sellers.length; i++){
        Card card = Card(
          child: Column(children: [
            Text(sellers[i].firstName+
            " "+sellers[i].lastName),
            Text(sellers[i].idNumber),
            ElevatedButton(onPressed: (){
                    authorizeUser(sellers[i].idNumber, i);
                  }, child: Text("Autorizar vendedor")),
          ],),
        );
        vendedoresAMostrar.add(card);
      }

      setState((){
        this.sellerCards = vendedoresAMostrar;
      });
    }
    catch(ex){
      setState(() {
        showError = true;
      });
    } 
  }
  
  List<SellerModel> parseUsers(String rawResponse) {

    final List<dynamic> jsonList = json.decode(rawResponse);

    if (jsonList.isEmpty) {
      throw Exception('Empty List');
    }

    return jsonList.map((json) {
      if (json is Map<String, dynamic>) {
        return SellerModel(
          firstName: json['firstName'] ?? '',
          lastName: json['lastName'] ?? '',
          idNumber: json['idNumber'] ?? '',
        );
      } else {
        throw Exception('error');
      }
    }).toList();
  }
  
  void authorizeUser(String idNumber, int position) async{
    String rawResponse = await provider.authorizeSeller(idNumber);

    if(rawResponse.contains("Seller has been authorized properly")){
      showAlert(context, "El vendedor ha sido autorizado correctamente");

      setState((){
        this.sellerCards.removeAt(position);
      });

    }
    else{
      showAlert(context, "Ha ocurrido un error. Intente de nuevo");
    }

  }

  void showAlert(BuildContext context, String text) {
    showDialog(
      context: context,
      builder: (BuildContext dialogContext) {
        return AlertDialog(
          title: Text('Resultado'),
          content: Text(text),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(dialogContext).pop(); // Dismiss the dialog
              },
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }
  
}
