import 'src/cli.dart';
import 'dart:io';
import 'src/login.dart';
import './src/config/config.dart';

int main() {
  String token = tokenGenerator();
  var cli = Cli(token);
  return 0;
}
