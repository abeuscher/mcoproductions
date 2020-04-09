<?php $data =  json_encode(array(
  "pages" => $page_data["pages"],
  "games" => $page_data["games"],
  "hosts" => $page_data["hosts"],
  "venues" => $page_data["venues"],
  "text_blocks" => $page_data["text_blocks"]
  ));
$file = fopen("data.json","w");
if (fwrite($file,$data)) {
  echo "file written";
} ?>