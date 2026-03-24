import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { randomUUID } from "crypto";

const client = new DynamoDBClient({ region: "ap-south-1" });

export const handler = async (event) => {

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const body = JSON.parse(event.body);

    if (!body.name || !body.phone || !body.flavor || !body.quantity) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "All fields are required!" })
      };
    }

    const orderId = randomUUID();

    await client.send(new PutItemCommand({
      TableName: "icecream-orders",
      Item: {
        orderId:   { S: orderId },
        name:      { S: body.name },
        phone:     { S: body.phone },
        flavor:    { S: body.flavor },
        quantity:  { N: String(body.quantity) },
        createdAt: { S: new Date().toISOString() }
      }
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: `Order placed successfully! 🍦`,
        orderId: orderId
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Something went wrong: " + err.message })
    };
  }
};