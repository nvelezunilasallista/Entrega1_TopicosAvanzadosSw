import 'dart:convert';
import 'package:http/http.dart' as http;

class LoginProvider{

    Future<String> login(String idNumber, String password) async{
        try{
          var url = Uri.parse("http://10.0.2.2:6542/api/loginUser");

          var data = {
                        'idNumber' : idNumber,
                        'password' : password
                    };

          final dataJson = jsonEncode(data);

          var response = await http.post(url,  headers: {'Content-Type': 'application/json'}, body: dataJson);

            String rawResponse = utf8.decode(response.bodyBytes);
            return rawResponse;
        }
        catch(ex){
            String msg = ex.toString();
            return msg;
        }
    }
}