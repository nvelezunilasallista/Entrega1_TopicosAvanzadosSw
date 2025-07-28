
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:topicosavanzados_clientemovil/loginProvider.dart';
import 'package:topicosavanzados_clientemovil/sellerList.dart';

class Login extends StatefulWidget{
  @override
  State<StatefulWidget> createState() {
    return _Login();
  }
}

class _Login extends State<Login> {

  GlobalKey<FormState> formKey = GlobalKey<FormState>();
  
  String idNumber = "";
  String password = "";
  bool showError = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Iniciar sesión")),
      body : Container(
        child: Form(
          key: formKey,
          child: Column(children: [
            getIdNumberField(),
            getPasswordField(),
            getLoginButton(),
            Visibility(
              child: Text("Error en las credenciales. Intente nuevamente", 
                  style: TextStyle(fontWeight: FontWeight.bold, color:  Colors.redAccent),),
              visible: showError,
            ),
          ],) ,)
      )
    );
  }

  getIdNumberField(){
    return TextFormField(
      keyboardType: TextInputType.name,
      decoration: InputDecoration(labelText: "Documento de identidad"),
      validator: (value){
        if(value!.length > 1){
          return null;
        }else{
          return "Número de documento inválido";
        }
      },
      onSaved: (value){
        this.idNumber = value!;
      }
    );
  }

  getPasswordField(){
    return TextFormField(
      keyboardType: TextInputType.name,
      decoration: InputDecoration(labelText: "Contraseña"),
      obscureText: true,
      validator: (value){
        if(value!.length > 1){
          return null;
        }else{
          return "Contraseña inválida";
        }
      },
      onSaved: (value){
        this.password = value!;
      }
    );
  }

  getLoginButton(){
    return ElevatedButton(onPressed: (){
      if(formKey.currentState!.validate()){
        formKey.currentState!.save();
        validateLogin();
        //Navigator.pop(context);
      }
    }, child: Text("Iniciar sesión"));
  }

  validateLogin() async{

    LoginProvider provider = LoginProvider();

    try{

      String response = await provider.login(idNumber, password);

       Map<String, dynamic> jsonMap = json.decode(response);
        if (jsonMap.containsKey('token')) {
          String token =  jsonMap['token'];
          SharedPreferences config = await SharedPreferences.getInstance();
          config.setString("token", token);

          Navigator.pushReplacement(
              context,
              MaterialPageRoute(builder: (context) => SellerList()),
            );

        } else {
          throw Exception('El campo "token" no está presente en el JSON.');
        }


    }catch(ex){

      setState(() {
        showError = true;
      });

    }
  }

}