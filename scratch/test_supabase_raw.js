const supabaseUrl = 'https://wvauuythfcbtuvuaylaf.supabase.co';
const supabaseAnonKey = 'sb_publishable_w962kvSRNCYldh6BH-iWVg_RqJF3855';

async function testTable(tableName, body) {
  const url = `${supabaseUrl}/rest/v1/${tableName}`;
  console.log(`Testing insert into ${tableName}...`);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(body)
    });
    const status = res.status;
    const text = await res.text();
    console.log(`${tableName} response (status ${status}):`, text);
  } catch (err) {
    console.error(`Error testing ${tableName}:`, err);
  }
}

async function run() {
  await testTable('TAMEED', {
    name: 'Test',
    phone: '12345678',
    business_type: 'Test',
    message: 'Test message'
  });

  await testTable('clients', {
    name: 'Test',
    phone: '12345678',
    business_type: 'Test',
    message: 'Test message'
  });

  await testTable('leads', {
    name: 'Test',
    phone: '12345678',
    business_type: 'Test',
    message: 'Test message',
    source: 'contact_form'
  });
}

run();
