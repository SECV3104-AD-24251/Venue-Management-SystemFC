<!DOCTYPE html>
<html>
<head>
    <title>Maintenance Report</title>
</head>
<body>
    <h1>Maintenance Report</h1>
    <p><strong>Venue:</strong> {{ $maintenance->venue->name }}</p>
    <p><strong>Description:</strong> {{ $maintenance->description }}</p>
    <p><strong>Scheduled Date:</strong> {{ $maintenance->scheduled_for_date }}</p>
    <p><strong>Status:</strong> {{ $maintenance->status }}</p>
    <p><strong>Created At:</strong> {{ $maintenance->created_at }}</p>
    <p><strong>Completed At:</strong> {{ $maintenance->updated_at }}</p>
</body>
</html>
