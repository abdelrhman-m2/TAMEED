export type Lang = "ar" | "en";

export type Dict = {
  brand: { name: string; tagline: string };
  nav: Record<string, string>;
  hero: { eyebrow: string; title: string; subtitle: string; cta1: string; cta2: string; trust: string[] };
  pains: { title: string; subtitle: string; items: { t: string; d: string }[] };
  solutions: { title: string; subtitle: string; items: { t: string; d: string }[] };
  competitive: { title: string; subtitle: string; items: { t: string; d: string }[] };
  services: {
    title: string;
    subtitle: string;
    columns: { t: string; items: string[] }[];
  };
  pos: {
    title: string;
    subtitle: string;
    points: string[];
    receipt: { branch: string; totalLabel: string; items: { n: string; p: string }[]; total: string };
  };
  heroKpi: { revenue: string; revenueValue: string; orders: string; ordersValue: string; trend: string };
  tech: { title: string; items: string[] };
  stats: { items: { v: string; l: string }[] };
  testimonials: { title: string; items: { q: string; a: string; r: string }[] };
  cta: { title: string; sub: string };
  about: { title: string; intro: string; vision: { t: string; d: string }; mission: { t: string; d: string }; values: { t: string; d: string } };
  industries: { title: string; items: { t: string; d: string }[] };
  clients: { title: string; sub: string };
  contact: { title: string; sub: string; name: string; phone: string; business: string; message: string; submit: string; success: string; error: string };
  pricing: { title: string; sub: string; users: string; business: string; modules: string; est: string; note: string; request: string };
  sim: {
    title: string; sub: string;
    kpi: { sales: string; revenue: string; stock: string; top: string };
    pos: { title: string; add: string; item: string; qty: string; price: string; total: string; invoice: string; clear: string };
    inv: { title: string; product: string; stock: string; action: string };
    rep: { title: string; sales: string; profit: string };
    invoiceCreated: string;
  };
  systems: { title: string; sub: string };
  systemsCatalog: {
    title: string;
    subtitle: string;
    items: {
      t: string;
      d: string;
      points: string[];
    }[];
  };
  footer: { rights: string; desc: string; company: string; product: string; contact: string };
  common: { learnMore: string; getStarted: string; explore: string };
};

export const ar: Dict = {
  brand: { name: "TAMEED", tagline: "نظام تخطيط موارد المؤسسات" },
  nav: {
    home: "الرئيسية",
    about: "من نحن",
    systems: "الأنظمة",
    industries: "القطاعات",
    clients: "العملاء",
    pricing: "حاسبة الأسعار",
    simulation: "تجربة حية",
    contact: "تواصل معنا",
    quote: "اطلب عرض سعر",
    demo: "احجز عرضاً تجريبياً",
  },
  hero: {
    eyebrow: "نظام ERP متكامل · مبني على Oracle",
    title: "تحكّم في كل تفاصيل عملك من مكان واحد",
    subtitle:
      "نظام محاسبة، مخزون، مبيعات، موارد بشرية، ونقاط بيع — في منصة واحدة سريعة وآمنة.",
    cta1: "احجز عرضاً تجريبياً",
    cta2: "جرّب النظام الآن",
    trust: ["قاعدة بيانات Oracle", "أداء عالي", "أمان مؤسسي"],
  },
  pains: {
    title: "هل تواجه هذه التحديات؟",
    subtitle: "نظام واحد يحلّ كل ذلك.",
    items: [
      { t: "أخطاء محاسبية", d: "حسابات غير دقيقة وتقارير متأخرة." },
      { t: "اضطراب المخزون", d: "نقص أو فائض دون رؤية لحظية." },
      { t: "بطء عمليات البيع", d: "نقاط بيع لا تواكب ضغط العملاء." },
      { t: "تقارير غير واضحة", d: "قرارات بناءً على بيانات ناقصة." },
    ],
  },
  solutions: {
    title: "حلول متكاملة لإدارة أعمالك",
    subtitle: "وحدات متخصصة تعمل معاً بانسجام.",
    items: [
      { t: "نظام المحاسبة المالية", d: "تسجيل وتصنيف وتلخيص وتفسير الأنشطة المالية لاتخاذ قرارات دقيقة." },
      { t: "إدارة الأصول الثابتة", d: "تسجيل وتتبع الأصول وإدارة دورة الحياة وحساب الإهلاك بتقارير موثوقة." },
      { t: "المخازن والمشتريات والمبيعات", d: "إدارة المستودعات والجرد والمبيعات والمشتريات بشكل متكامل ورؤية لحظية." },
      { t: "المشتريات الخارجية", d: "حساب التكلفة الشاملة للمواد المستوردة وربطها بالمخزون والحسابات تلقائياً." },
      { t: "شؤون الموظفين والرواتب", d: "إدارة الحضور والرواتب والعقود والتأمينات والتكامل المحاسبي للشركات متعددة الفروع." },
      {
        t: "نظام نقاط البيع",
        d: "نظام نقاط بيع متكامل للصيدليات، السوبر ماركت، ومتاجر التجزئة — ذهب، مواد، جوالات، ملابس جاهزة وغيرها.",
      },
    ],
  },
  competitive: {
    title: "الميزة التنافسية",
    subtitle: "ما يميزنا عن باقي المنافسين في السوق",
    items: [
      { t: "قوي", d: "برامجنا مبنية على قواعد بيانات أوراكل لتقديم أفضل أداء وحماية لبياناتك." },
      { t: "محلي", d: "مصمم ليتناسب مع طريقة عمل الشركات السعودية مع الالتزام بقوانين وإجراءات الجهات الحكومية." },
      { t: "دعم", d: "ملتزمون بأفضل دعم ما بعد البيع والتدريب — نجاحنا يعتمد على نجاح عملائنا." },
    ],
  },
  services: {
    title: "الخدمات",
    subtitle:
      "خدمات تعميد تسعى إلى الجمع بين معرفتنا بطريقة عمل العميل والخبرة التقنية وأدوات النظم المناسبة لخلق الحل الأمثل.",
    columns: [
      {
        t: "هاردوير",
        items: [
          "خوادم وأجهزة",
          "حماية الشبكات",
          "نقاط بيع وملحقاته",
          "توصيل الفروع",
          "أجهزة البصمة والعين",
          "كاميرات المراقبة",
          "مكائن جرد",
          "طابعات وسكانر",
          "بطاريات الكهرباء وكبائن",
          "سويتش والكابلات",
          "عارض الأسعار",
        ],
      },
      {
        t: "الأنظمة الأساسية",
        items: [
          "الحسابات العامة",
          "إدارة شؤون الموظفين",
          "إدارة المخازن",
          "نقطة بيع",
          "إدارة علاقات العملاء",
          "الصادر والوارد",
        ],
      },
      {
        t: "أنظمة متخصصة",
        items: [
          "أنظمة طبية",
          "أنظمة تصنيع",
          "أنظمة مقاولات",
          "أنظمة التجزئة",
          "أنظمة مطاعم",
          "أنظمة إدارة الفنادق",
          "أنظمة الصيدليات",
          "أنظمة أخرى",
        ],
      },
      {
        t: "خدمات أخرى",
        items: [
          "استشارات تقنية",
          "تطوير أنظمة الشركات",
          "بناء شبكات تقنية",
          "مواقع إلكترونية وتطبيقات",
          "جوالات",
          "التدريب",
          "الصيانة",
          "التسويق الإلكتروني",
          "الرسائل الجماعية",
        ],
      },
    ],
  },
  pos: {
    title: "نظام نقاط البيع للصيدليات والمتاجر",
    subtitle: "حل متكامل للصيدليات، السوبر ماركت، ومتاجر التجزئة — ذهب، مواد، جوالات، ملابس جاهزة وغيرها.",
    points: ["دفع فوري", "دعم الباركود", "تقارير لحظية", "يعمل دون اتصال", "متعدد الفروع", "يدعم كل أنواع التجزئة"],
    receipt: {
      branch: "نقاط بيع · فرع 01",
      totalLabel: "الحالة",
      items: [
        { n: "باراسيتامول ×2", p: "مكتمل" },
        { n: "أرز 5 كجم ×1", p: "مكتمل" },
        { n: "خاتم ذهب ×1", p: "مكتمل" },
      ],
      total: "نشط",
    },
  },
  heroKpi: {
    revenue: "الفواتير اليومية",
    revenueValue: "450",
    orders: "المستخدمين النشطين",
    ordersValue: "1,240",
    trend: "+12.4%",
  },
  tech: { title: "بنية تقنية مؤسسية", items: ["Oracle", "Angular", ".NET", "REST APIs"] },
  stats: {
    items: [
      { v: "+100", l: "عميل" },
      { v: "+10", l: "سنوات خبرة" },
      { v: "+5", l: "قطاعات" },
      { v: "99.9%", l: "وقت تشغيل" },
    ],
  },
  testimonials: {
    title: "ماذا يقول عملاؤنا",
    items: [
      { q: "أصبحت إدارة الفروع أسهل بكثير، والتقارير دقيقة لحظياً.", a: "أحمد م.", r: "مدير سلسلة سوبرماركت" },
      { q: "نقاط البيع سريعة جداً وقللت أخطاء الكاشير.", a: "سارة ع.", r: "صاحبة صيدلية" },
      { q: "النظام مرن ويتكامل مع كل احتياجاتنا التشغيلية.", a: "خالد ر.", r: "مدير مالي" },
    ],
  },
  cta: { title: "اطلب عرض سعر", sub: "أرسل احتياجك وسنتواصل معك قريباً." },
  about: {
    title: "نبني أنظمة تستحق ثقتك",
    intro: "TAMEED شركة برمجيات متخصصة في حلول ERP المؤسسية منذ أكثر من عقد.",
    vision: { t: "رؤيتنا", d: "أن نكون الخيار الأول لأنظمة إدارة الأعمال في المنطقة." },
    mission: { t: "رسالتنا", d: "تمكين الشركات بأدوات تشغيل متكاملة، آمنة، وسهلة." },
    values: { t: "قيمنا", d: "الموثوقية، الأداء، الشفافية، والشراكة الحقيقية مع العميل." },
  },
  industries: {
    title: "قطاعات نخدمها",
    items: [
      { t: "السوبرماركت", d: "إدارة فروع متعددة وأصناف بالآلاف." },
      { t: "المطاعم", d: "طلبات، طاولات، مطبخ، وتوصيل." },
      { t: "الصيدليات", d: "تتبّع الدفعات والصلاحيات." },
      { t: "تجارة التجزئة", d: "POS متعدد الفروع وتقارير." },
      { t: "المقاولات", d: "إدارة مشاريع ومخازن وأصول." },
      { t: "الخدمات", d: "فوترة وعقود ومتابعة عملاء." },
    ],
  },
  clients: { title: "موثوقون من قبل قادة الصناعة", sub: "" },
  contact: {
    title: "تواصل معنا",
    sub: "أرسل طلبك وسيتواصل معك أحد مستشارينا خلال ساعات.",
    name: "الاسم", phone: "رقم الجوال", business: "نوع النشاط", message: "رسالتك",
    submit: "إرسال", success: "تم استلام طلبك بنجاح", error: "حدث خطأ، حاول مرة أخرى",
  },
  pricing: {
    title: "حاسبة الأسعار",
    sub: "احصل على تقدير فوري بناءً على حجم عملك.",
    users: "عدد المستخدمين", business: "نوع النشاط",
    modules: "الوحدات المطلوبة", est: "التقدير الشهري",
    note: "السعر تقديري، يتم تأكيده بعد دراسة احتياجاتك.",
    request: "حوّل التقدير إلى عرض رسمي",
  },
  sim: {
    title: "تجربة حية للنظام",
    sub: "تفاعل مع لوحة تحكم حقيقية: مبيعات، مخزون، نقاط بيع، وتقارير.",
    kpi: { sales: "مبيعات اليوم", revenue: "إجمالي الإيرادات", stock: "حالة المخزون", top: "المنتج الأعلى" },
    pos: { title: "محاكاة نقاط البيع", add: "أضف", item: "المنتج", qty: "كمية", price: "السعر", total: "الإجمالي", invoice: "إصدار فاتورة", clear: "مسح" },
    inv: { title: "حركة المخزون", product: "المنتج", stock: "المخزون", action: "تعديل" },
    rep: { title: "تقارير المبيعات والأرباح", sales: "المبيعات", profit: "الأرباح" },
    invoiceCreated: "تم إصدار فاتورة بقيمة",
  },
  systems: {
    title: "الأنظمة",
    sub: "وحدات متكاملة تعمل بسلاسة كنظام واحد.",
  },
  systemsCatalog: {
    title: "تفاصيل الأنظمة",
    subtitle: "استعرض أهم الوظائف والمزايا لكل نظام.",
    items: [
      {
        t: "نظام المحاسبة المالية",
        d: "العمود الفقري لأي مؤسسة اقتصادية لتقديم صورة دقيقة عن الأداء والوضع المالي.",
        points: [
          "التسجيل: قيود اليومية وترحيلها لدفتر الأستاذ.",
          "التصنيف: الحسابات وشجرة الحسابات (Chart of Accounts).",
          "التلخيص: التسويات وإعداد القوائم المالية.",
          "التفسير: التحليل المالي والنسب والاتجاهات والتدفقات النقدية والتقارير.",
          "القوائم الرئيسية: قائمة الدخل، الميزانية العمومية، التدفقات النقدية.",
          "الامتثال والشفافية والتخطيط المالي ودعم اتخاذ القرار.",
          "دعم المعايير: IFRS و GAAP.",
        ],
      },
      {
        t: "نظام إدارة الأصول الثابتة",
        d: "نظام متكامل لتحسين إدارة ومراقبة الأصول وتعزيز الكفاءة التشغيلية والشفافية.",
        points: [
          "تسجيل الأصول وتتبعها (النوع، الرقم التسلسلي، الموقع، تاريخ الشراء).",
          "إدارة دورة حياة الأصل من الشراء إلى التخلص مع جدولة الصيانة.",
          "حساب الإهلاك بطرق متعددة (القسط الثابت/المتناقص) وتقارير دقيقة.",
          "التكامل مع المحاسبة والمخزون والموارد البشرية لتسهيل التدقيق.",
          "إدارة المخاطر والامتثال للمعايير المحاسبية والقوانين المحلية والدولية.",
          "تقارير وتحليلات حول أداء الأصول ودعم القرار.",
          "مستويات أمان وصلاحيات لحماية بيانات الأصول.",
        ],
      },
      {
        t: "نظام المخازن والمشتريات والمبيعات",
        d: "إدارة المستودعات والمخزون والمبيعات والمشتريات والجرد بشكل متكامل.",
        points: [
          "إدارة التخزين وتنظيم المواقع ووضع العلامات واستخدام المساحة بكفاءة.",
          "الاستلام والشحن وفحص المواد الواردة والصادرة وضمان الجودة.",
          "الجرد الدوري ومطابقة السجلات مع الواقع.",
          "التتبع والتحكم باستخدام أنظمة WMS لمراقبة حركة المخزون.",
          "إدارة المبيعات: التخطيط، تدريب الفريق، تحليل الأداء والتقارير.",
          "إدارة المشتريات المحلية: اختيار الموردين، التفاوض، أوامر الشراء والمتابعة.",
          "إدارة الجرد: تحليل ABC، نقاط إعادة الطلب، ضبط المخزون والتخلص من الفائض.",
        ],
      },
      {
        t: "نظام المشتريات الخارجية",
        d: "يبسّط عمليات الشراء المستورد ويحسب التكلفة الكلية مع الربط بالمخازن والمالية.",
        points: [
          "حساب التكلفة الشاملة للصنف بعد إضافة مصاريف الشحن والتفريغ والتأمين وغيرها.",
          "ربط مباشر مع المخازن لتحديث المستودعات وتحسين الإمداد والتوريد.",
          "تكامل مع النظام المالي وترحيل القيود تلقائياً بالعملة المحلية أو الأجنبية.",
          "إدارة أوامر الشراء ومعرفة المتبقي وتسجيل المصروفات المرتبطة بها.",
          "تحسين الكفاءة التشغيلية عبر تكامل الأقسام وتقليل الوقت والجهد.",
        ],
      },
      {
        t: "نظام شؤون الموظفين والرواتب",
        d: "إدارة متقدمة للموارد البشرية والرواتب مع الامتثال والتكامل المحاسبي.",
        points: [
          "إدارة مركزية للشركات متعددة الفروع وتوحيد الإجراءات والسياسات.",
          "معالجة آلية للمعاملات الحكومية (تأشيرات، إقامات، تصاريح عمل).",
          "إدارة العهد المالية والعينية ومتابعتها وتقليل الهدر.",
          "نماذج داخلية متكاملة (إجازات، حوادث، أداء) وتنظيم الوثائق.",
          "تكامل مع ماكينات البصمة للحضور والانصراف وفتح الأبواب ودعم أنماط الدوام.",
          "معالجة المخصصات (بدلات/مكافآت/حوافز) وفق السياسات المعتمدة.",
          "الجوانب المالية: الرواتب، الإجازات، تذاكر السفر، نهاية الخدمة.",
          "ربط كامل مع المحاسبة وتوحيد التقارير المالية.",
          "أرشفة العقود والوثائق ومعالجة التأمينات والامتيازات وتعريف أنواع العقود آلياً.",
        ],
      },
      {
        t: "نظام نقاط البيع",
        d: "نظام نقاط بيع متكامل للصيدليات، السوبر ماركت، ومتاجر التجزئة — ذهب، مواد، جوالات، ملابس جاهزة وغيرها.",
        points: [
          "واجهة سريعة للكاشير مع دعم الباركود والبحث بالاسم أو الرقم.",
          "يدعم الصيدليات: تتبع الدفعات، الصلاحيات، والوصفات.",
          "يدعم السوبر ماركت: أصناف بالآلاف، عروض، ووحدات قياس متعددة.",
          "يدعم متاجر التجزئة: ذهب، جوالات، ملابس جاهزة، ومواد البناء.",
          "تقارير مبيعات لحظية وربط مباشر مع المخزون والمحاسبة.",
          "يعمل دون اتصال ويتزامن تلقائياً عند عودة الشبكة.",
          "إدارة متعددة الفروع مع صلاحيات مرنة لكل مستخدم.",
        ],
      },
    ],
  },
  footer: {
    rights: "جميع الحقوق محفوظة",
    desc: "حلول ERP مؤسسية لإدارة أعمالك بكفاءة عالية.",
    company: "الشركة", product: "المنتج", contact: "تواصل",
  },
  common: { learnMore: "اعرف المزيد", getStarted: "ابدأ الآن", explore: "استكشف" },
};

export const en: Dict = {
  brand: { name: "TAMEED", tagline: "Enterprise Resource Planning" },
  nav: {
    home: "Home", about: "About", systems: "Systems", industries: "Industries",
    clients: "Clients", pricing: "Pricing", simulation: "Live Demo",
    contact: "Contact", quote: "Request a Quote", demo: "Book a Demo",
  },
  hero: {
    eyebrow: "Integrated ERP · Powered by Oracle",
    title: "Run every part of your business from one place",
    subtitle: "Accounting, Inventory, Sales, HR and POS — unified in one fast, secure platform.",
    cta1: "Book a Demo", cta2: "Try it Live",
    trust: ["Oracle Database", "High performance", "Enterprise security"],
  },
  pains: {
    title: "Sound familiar?",
    subtitle: "One system solves all of this.",
    items: [
      { t: "Accounting errors", d: "Inaccurate books and late reports." },
      { t: "Inventory chaos", d: "Stock-outs and overstock without visibility." },
      { t: "Slow sales", d: "POS that can't keep up with rush hours." },
      { t: "Unclear reports", d: "Decisions based on incomplete data." },
    ],
  },
  solutions: {
    title: "Integrated business solutions",
    subtitle: "Specialized modules working in harmony.",
    items: [
      { t: "Financial Accounting", d: "Record, classify, summarize and interpret financial activities for accurate decisions." },
      { t: "Fixed Assets Management", d: "Track assets, lifecycle, depreciation and reporting with strong controls." },
      { t: "Warehouses, Purchasing & Sales", d: "Unified inventory, sales and purchasing with real-time visibility and audits." },
      { t: "International Purchasing", d: "Accurate landed cost with logistics expenses, integrated with inventory and finance." },
      { t: "HR & Payroll", d: "Attendance, payroll, contracts and benefits with compliance and accounting integration." },
      {
        t: "Point of Sale System",
        d: "Integrated POS for pharmacies, supermarkets, and retail stores — gold, materials, mobiles, ready-made clothing, and more.",
      },
    ],
  },
  competitive: {
    title: "Competitive advantage",
    subtitle: "What sets us apart",
    items: [
      { t: "Powerful", d: "Built on Oracle databases for top performance and data protection." },
      { t: "Localized", d: "Designed to match Saudi business workflows with government compliance." },
      { t: "Support", d: "Committed post-sales support and training—our success depends on yours." },
    ],
  },
  services: {
    title: "Services",
    subtitle:
      "We combine business understanding, technical expertise, and the right tools to deliver the best-fit solution.",
    columns: [
      {
        t: "Hardware",
        items: [
          "Servers & devices",
          "Network security",
          "POS & accessories",
          "Branch connectivity",
          "Biometric devices",
          "CCTV",
          "Inventory scanners",
          "Printers & scanners",
          "Power cabinets & batteries",
          "Switches & cables",
          "Price display",
        ],
      },
      {
        t: "Core systems",
        items: [
          "General ledger",
          "HR management",
          "Inventory management",
          "Point of Sale",
          "Customer Relationship Management",
          "Inbound & outbound",
        ],
      },
      {
        t: "Specialized systems",
        items: [
          "Medical systems",
          "Manufacturing systems",
          "Contracting systems",
          "Retail systems",
          "Restaurant systems",
          "Hotel management systems",
          "Pharmacy systems",
          "Other systems",
        ],
      },
      {
        t: "Other services",
        items: [
          "Technical consulting",
          "Custom systems development",
          "Network build-out",
          "Websites & applications",
          "Mobile",
          "Training",
          "Maintenance",
          "Digital marketing",
          "Bulk messaging",
        ],
      },
    ],
  },
  pos: {
    title: "Point of Sale for Pharmacies & Retail",
    subtitle: "Integrated POS for pharmacies, supermarkets, and retail — gold, materials, mobiles, ready-made clothing, and more.",
    points: ["Instant checkout", "Barcode support", "Real-time reports", "Works offline", "Multi-branch", "All retail types"],
    receipt: {
      branch: "POS · Branch 01",
      totalLabel: "Status",
      items: [
        { n: "Paracetamol ×2", p: "Completed" },
        { n: "Rice 5kg ×1", p: "Completed" },
        { n: "Gold Ring ×1", p: "Completed" },
      ],
      total: "Active",
    },
  },
  heroKpi: {
    revenue: "Daily Invoices",
    revenueValue: "450",
    orders: "Active Users",
    ordersValue: "1,240",
    trend: "+12.4%",
  },
  tech: { title: "Enterprise-grade tech stack", items: ["Oracle", "Angular", ".NET", "REST APIs"] },
  stats: {
    items: [
      { v: "+100", l: "Clients" },
      { v: "+10", l: "Years" },
      { v: "+5", l: "Industries" },
      { v: "99.9%", l: "Uptime" },
    ],
  },
  testimonials: {
    title: "What our clients say",
    items: [
      { q: "Multi-branch management became effortless and reports are instant.", a: "Ahmed M.", r: "Supermarket Chain Director" },
      { q: "POS is incredibly fast and reduced cashier mistakes.", a: "Sara A.", r: "Pharmacy Owner" },
      { q: "Flexible system that fits our entire operation.", a: "Khaled R.", r: "CFO" },
    ],
  },
  cta: { title: "Request a quote", sub: "Send your needs and we will reach out shortly." },
  about: {
    title: "We build systems worth your trust",
    intro: "TAMEED is a software company specialized in enterprise ERP for over a decade.",
    vision: { t: "Vision", d: "To be the first choice for business management systems in the region." },
    mission: { t: "Mission", d: "Empower companies with integrated, secure and easy operations tools." },
    values: { t: "Values", d: "Reliability, performance, transparency, and real partnership." },
  },
  industries: {
    title: "Industries we serve",
    items: [
      { t: "Supermarkets", d: "Multi-branch with thousands of SKUs." },
      { t: "Restaurants", d: "Orders, tables, kitchen and delivery." },
      { t: "Pharmacies", d: "Batch and expiry tracking." },
      { t: "Retail", d: "Multi-branch POS and analytics." },
      { t: "Contracting", d: "Projects, warehouses and assets." },
      { t: "Services", d: "Billing, contracts and CRM." },
    ],
  },
  clients: { title: "Trusted by industry leaders", sub: "" },
  contact: {
    title: "Contact us", sub: "Send your request and a consultant will reach out shortly.",
    name: "Full name", phone: "Phone", business: "Business type", message: "Your message",
    submit: "Send", success: "Your request was received successfully", error: "Something went wrong, try again",
  },
  pricing: {
    title: "Pricing calculator", sub: "Get an instant estimate based on your business size.",
    users: "Number of users", business: "Business type", modules: "Modules",
    est: "Monthly estimate", note: "This is an estimate and is confirmed after a discovery call.",
    request: "Convert estimate to formal quote",
  },
  sim: {
    title: "Live system experience",
    sub: "Interact with a real dashboard: sales, inventory, POS and reports.",
    kpi: { sales: "Today's Sales", revenue: "Total Revenue", stock: "Stock Status", top: "Top Product" },
    pos: { title: "POS Simulation", add: "Add", item: "Product", qty: "Qty", price: "Price", total: "Total", invoice: "Issue Invoice", clear: "Clear" },
    inv: { title: "Inventory Movements", product: "Product", stock: "Stock", action: "Adjust" },
    rep: { title: "Sales & Profit Reports", sales: "Sales", profit: "Profit" },
    invoiceCreated: "Invoice issued for",
  },
  systems: { title: "Systems", sub: "Integrated modules working seamlessly as one." },
  systemsCatalog: {
    title: "Systems details",
    subtitle: "Key functions and highlights for each system.",
    items: [
      {
        t: "Financial Accounting",
        d: "The backbone of any organization—accurate reporting of financial performance and position.",
        points: [
          "Recording: journal entries and posting to the ledger.",
          "Classification: accounts and chart of accounts.",
          "Summarizing: period-end adjustments and statements preparation.",
          "Interpreting: ratios, trend analysis, cash flow analysis and reporting.",
          "Core statements: income statement, balance sheet, cash flow.",
          "Compliance, transparency, planning, and decision support.",
          "Standards support: IFRS and GAAP.",
        ],
      },
      {
        t: "Fixed Assets Management",
        d: "End-to-end asset control that boosts operational efficiency and transparency.",
        points: [
          "Register and track assets (type, serial, location, purchase date).",
          "Lifecycle management from acquisition to disposal with maintenance schedules.",
          "Depreciation methods (straight-line / declining) with accurate reporting.",
          "Integrates with accounting, inventory and HR for audit readiness.",
          "Risk management and compliance with local/international requirements.",
          "Analytics and performance reporting for better decisions.",
          "Security and role-based access controls.",
        ],
      },
      {
        t: "Warehouses, Purchasing & Sales",
        d: "Unified inventory, warehouse operations, purchasing and sales with full auditability.",
        points: [
          "Warehouse storage organization and location management.",
          "Receiving and shipping with inspections and quality controls.",
          "Cycle counts and stock reconciliation.",
          "Tracking via WMS for movement control.",
          "Sales planning, enablement and performance reporting.",
          "Local purchasing: supplier selection, negotiation, POs and follow-up.",
          "Inventory optimization: ABC analysis, reorder points, surplus handling.",
        ],
      },
      {
        t: "International Purchasing",
        d: "Streamlined importing with landed-cost accounting and seamless integrations.",
        points: [
          "Accurate landed cost including shipping, unloading and insurance.",
          "Direct warehouse integration for balanced replenishment.",
          "Financial integration with automatic postings in local/foreign currencies.",
          "PO tracking with remaining quantities and expense allocation.",
          "Operational efficiency through cross-department integration.",
        ],
      },
      {
        t: "HR & Payroll",
        d: "Advanced HR and payroll with compliance, automation, and accounting integration.",
        points: [
          "Centralized multi-branch HR management.",
          "Automated government transactions (visas, residency, work permits).",
          "Track financial and physical custody items.",
          "Internal forms and document workflows.",
          "Biometric attendance and access integration with flexible schedules.",
          "Allowances, bonuses, incentives management per policy.",
          "Payroll, leave, travel tickets, end-of-service benefits.",
          "Full accounting integration for unified financial reporting.",
          "Contracts, archiving, insurance and benefits administration.",
        ],
      },
      {
        t: "Point of Sale System",
        d: "Integrated POS for pharmacies, supermarkets, and retail stores — gold, materials, mobiles, ready-made clothing, and more.",
        points: [
          "Fast cashier interface with barcode and name/SKU search.",
          "Pharmacy support: batch tracking, expiry dates, and prescriptions.",
          "Supermarket support: thousands of SKUs, promotions, and multi-unit pricing.",
          "Retail support: gold, mobiles, ready-made clothing, and building materials.",
          "Real-time sales reports with direct inventory and accounting integration.",
          "Offline mode with automatic sync when connectivity returns.",
          "Multi-branch management with flexible role-based permissions.",
        ],
      },
    ],
  },
  footer: { rights: "All rights reserved", desc: "Enterprise ERP solutions to run your business efficiently.", company: "Company", product: "Product", contact: "Contact" },
  common: { learnMore: "Learn more", getStarted: "Get started", explore: "Explore" },
};

export const dictionaries = { ar, en };
