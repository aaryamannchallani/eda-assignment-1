#!/bin/bash
# Credits: IBM
echo "Gen2 License client Install"
/usr/z1090/bin/gen2_init
sleep 5s
echo "Gen2 License client installed"
sleep 5s
echo "Configure Gen2 License client"
/usr/z1090/bin/clientconfig_cli -g2s1 $LM
echo "Gen2 License client configured"
sleep 5s
echo "Reset UIM"
/usr/z1090/bin/uimreset -r
echo "UIM reset"
sleep 5s
echo "Setup iptables"
/home/ibmsys1/volumes/iptables-script.sh
echo “iptables set”
inotifywait -r -m -e modify ./output.txt |
   while read path _ file; do
       payload=`cat output.txt`
       curl -X POST -H "Content-Type: application/vnd.kafka.json.v1+json" \
      --data '{"records":[{"value":{"sin":"$payload"}}]}' "http://kafka:9092/topics/sin"
  {"offsets":[{"partition":0,"offset":0,"error_code":null,"error":null}],"key_schema_id":null,"value_schema_id":null}

done

