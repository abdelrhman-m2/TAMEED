import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wvauuythfcbtuvuaylaf.supabase.co';
const supabaseAnonKey = 'sb_publishable_w962kvSRNCYldh6BH-iWVg_RqJF3855';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log("Testing insert into TAMEED...");
  const { data: d1, error: e1 } = await supabase.from('TAMEED').insert({
    name: 'Test',
    phone: '12345678',
    business_type: 'Test',
    message: 'Test message'
  });
  console.log("TAMEED:", { d1, e1 });

  console.log("Testing insert into clients...");
  const { data: d2, error: e2 } = await supabase.from('clients').insert({
    name: 'Test',
    phone: '12345678',
    business_type: 'Test',
    message: 'Test message'
  });
  console.log("clients:", { d2, e2 });

  console.log("Testing insert into leads...");
  const { data: d3, error: e3 } = await supabase.from('leads').insert({
    name: 'Test',
    phone: '12345678',
    business_type: 'Test',
    message: 'Test message',
    source: 'contact_form'
  });
  console.log("leads:", { d3, e3 });
}

test();
