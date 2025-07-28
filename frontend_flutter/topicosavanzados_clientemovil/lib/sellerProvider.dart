import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class SellerProvider{

    Future<String> getUnauthorizedSellers() async{
        try{
          var url = Uri.parse("http://10.0.2.2:6542/api/humanResources/getUnauthorizedSellers");
          
          SharedPreferences config = await SharedPreferences.getInstance();
          String token = config.getString("token")!;

          var response = await http.get(url,  headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer '+ token});

            String rawResponse = utf8.decode(response.bodyBytes);
            return rawResponse;
        }
        catch(ex){
            String msg = ex.toString();
            return msg;
        }
    }

    Future<String> authorizeSeller(String idNumber) async{
        try{
          var url = Uri.parse("http://10.0.2.2:6542/api/humanResources/authorizeSeller");

          SharedPreferences config = await SharedPreferences.getInstance();
          String token = config.getString("token")!;

          var data = {
                        'idNumber' : idNumber
                    };

          final dataJson = jsonEncode(data);

          var response = await http.post(url,  headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer '+ token}, body: dataJson);

          String rawResponse = utf8.decode(response.bodyBytes);
          return rawResponse;

        }
        catch(ex){
            String msg = ex.toString();
            return msg;
        }
    }
    
}