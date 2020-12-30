import 'dart:io';
import 'package:http/http.dart' as http;
import 'services/createuser.dart';
import 'services/history.dart';
import 'services/listuser.dart';
import 'services/updateuser.dart';
import 'services/deletuser.dart';
import 'services/compile_gcc.dart';

Cli(String token) async
{


  while(true)
  {
    help();
    //print("Veuillez saisir l'opération");
    var choice = stdin.readLineSync();

    switch (choice) {
      case "createuser":
        {
         await createuser(token);
        }
        break;

      case "listuser":
        {
          await listuser(token);
        }
        break;

      case "alteruser":
        {
         await updateuser(token);
        }
        break;

      case "deleteuser":
        {
         await  deleteuser(token);
        }
        break;
      case "compile":
        {
         await  compile(token);
        }
        break;
      case "showhistory":
        {
          await showHistory(token);
        }
        break;
      case "help":
        {
         await  help();
        }
        break;

        case "exit":
        {
          return 0;
        }
        break;

      default:
        {
          print("Invalid choice");
        }
        break;
    }
  }
}


help() {
  print("\n");
  print("\n");
  print("Available commands:");
  print("   help          - display help");
  print("   createuser    - create user");
  print("   deleteuser    - delete existing user");
  print("   alteruser     - alter existing user");
  print("   listuser      - list all existing users");
  print("   compile       - compile C/C++/ASM code");
  print("   showhistory   - list compilation history");
  print("   exit          - exit the application");
}
