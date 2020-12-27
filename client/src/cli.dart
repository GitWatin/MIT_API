
import 'dart:io';
import 'package:http/http.dart' as http;
import 'services/createuser.dart';
import 'services/listuser.dart';


Cli()
{

   
  help();
  print("Veuillez saisir l'opération")
  var choice = stdin.readLineSync(); 
  
   switch(choice) { 
      case "createuser": {  print("Excellent"); } 
      break; 
     
      case "listuser": {  listuser(); } 
      break; 
     
      case "alteruser": {  print("Fair"); } 
      break; 
     
      case "deleteuser": {  print("Poor"); } 
      break; 

      case "help": {  help(); } 
      break; 
     
      default: { print("Invalid choice"); } 
      break; 
   } 

}

help()
{
  print("Available commands:");
          print("   help        - display help");
          print("   createuser  - create user");
          print("   deleteuser  - delete existing user");
          print("   alteruser   - alter existing user");
          print("   listuser - list existing users");
          print("   exit        - exit the application");
}