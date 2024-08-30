<?php
$tg_bot_token = "7405717817:AAG3LIsq6wwvQv2VTg5pUwyjHjdz5uGz9n4";
$chat_id = "-1002231685659";

// Получаем данные из POST запроса
$action = isset($_POST['action']) ? htmlspecialchars($_POST['action']) : 'Неизвестное действие';

// Дополнительная информация о пользователе
$ip_address = $_SERVER['REMOTE_ADDR'];
$user_agent = $_SERVER['HTTP_USER_AGENT'];
$date_time = date('d.m.y H:i:s');

// Определение устройства и операционной системы
function getDeviceInfo($user_agent) {
    $device = "Неизвестное устройство";
    $os = "Неизвестная ОС";

    // Определение типа устройства
    if (preg_match('/Mobile|Android|iP(hone|od|ad)/i', $user_agent)) {
        $device = "Мобильное устройство";
        if (preg_match('/Android/i', $user_agent)) {
            $os = "Android";
        } elseif (preg_match('/iP(hone|od|ad)/i', $user_agent)) {
            $os = "iOS";
        }
    } else {
        $device = "Компьютер";
        if (preg_match('/Windows NT 10.0/i', $user_agent)) {
            $os = "Windows 10";
        } elseif (preg_match('/Windows NT 11.0/i', $user_agent)) {
            $os = "Windows 11";
        } elseif (preg_match('/Mac OS X/i', $user_agent)) {
            $os = "Mac OS";
        } elseif (preg_match('/Linux/i', $user_agent)) {
            $os = "Linux";
        }
    }

    return [$device, $os];
}

list($device, $os) = getDeviceInfo($user_agent);

// Формируем текст сообщения с использованием Markdown, но без ссылки на IP
$text = "*Пользователь совершил действие:* $action\n";
$text .= "*IP-адрес:* $ip_address\n"; // IP-адрес как простой текст
$text .= "*Устройство:* $device\n";
$text .= "*Операционная система:* $os\n";
$text .= "*Время:* $date_time";

// Параметры для отправки в Telegram
$param = [
    "chat_id" => $chat_id,
    "text" => $text,
    "parse_mode" => "Markdown" // Указываем, что используем Markdown
];

// URL для отправки сообщения через Telegram API
$url = "https://api.telegram.org/bot" . $tg_bot_token . "/sendMessage?" . http_build_query($param);

// Отправляем запрос в Telegram
$response = file_get_contents($url);

// Проверка результата отправки
if ($response === false) {
    error_log("Error sending message to Telegram");
} else {
    echo '1'; // Успешный ответ
}
?>