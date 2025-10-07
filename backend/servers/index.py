import json
import os
from typing import Dict, Any, List
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Manage user game servers in cloud database
    Args: event - dict with httpMethod, body, queryStringParameters, headers
          context - object with request_id attribute
    Returns: HTTP response dict with server data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Email',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = event.get('headers', {})
    user_email = headers.get('x-user-email') or headers.get('X-User-Email', '')
    
    if not user_email:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'X-User-Email header required'}),
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database not configured'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    if method == 'GET':
        cursor.execute(
            "SELECT server_id, server_name, version, custom_id, players, max_players, status, created_at, updated_at FROM servers WHERE user_email = %s ORDER BY created_at DESC",
            (user_email,)
        )
        servers = cursor.fetchall()
        cursor.close()
        conn.close()
        
        servers_list = [dict(row) for row in servers]
        for server in servers_list:
            if server.get('created_at'):
                server['created_at'] = server['created_at'].isoformat()
            if server.get('updated_at'):
                server['updated_at'] = server['updated_at'].isoformat()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'servers': servers_list}),
            'isBase64Encoded': False
        }
    
    elif method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        servers: List[Dict] = body_data.get('servers', [])
        
        for server in servers:
            cursor.execute(
                """
                INSERT INTO servers (user_email, server_id, server_name, version, custom_id, players, max_players, status)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (user_email, server_id) 
                DO UPDATE SET 
                    server_name = EXCLUDED.server_name,
                    version = EXCLUDED.version,
                    custom_id = EXCLUDED.custom_id,
                    players = EXCLUDED.players,
                    max_players = EXCLUDED.max_players,
                    status = EXCLUDED.status,
                    updated_at = CURRENT_TIMESTAMP
                """,
                (
                    user_email,
                    server.get('id'),
                    server.get('name'),
                    server.get('version'),
                    server.get('customId'),
                    server.get('players', 0),
                    server.get('maxPlayers', 20),
                    server.get('status', 'offline')
                )
            )
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'saved': len(servers)}),
            'isBase64Encoded': False
        }
    
    elif method == 'DELETE':
        query_params = event.get('queryStringParameters', {})
        server_id = query_params.get('serverId', '')
        
        if not server_id:
            cursor.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'serverId parameter required'}),
                'isBase64Encoded': False
            }
        
        cursor.execute(
            "DELETE FROM servers WHERE user_email = %s AND server_id = %s",
            (user_email, server_id)
        )
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True}),
            'isBase64Encoded': False
        }
    
    cursor.close()
    conn.close()
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
