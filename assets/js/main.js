/* Bella Furniture & Outdoor – menu, talen (ES/EN/NL) en contactformulier */
(function () {
  "use strict";

  var T = {
    en: {
      "nav.showroom": "Showroom",
      "show.eyebrow": "Our showroom",
      "show.title": "2,000 m² of inspiration",
      "show.lead": "Stroll through fully furnished living rooms, dining rooms and bedrooms. Sit down, feel the fabrics and see how each piece looks in a real setting.",
      "show.filter": "Filter photos",
      "show.all": "All",
      "show.f.salon": "Living rooms",
      "show.f.comedor": "Dining",
      "show.f.dormitorio": "Bedrooms",
      "show.cat.salon": "Living room",
      "show.cat.comedor": "Dining",
      "show.cat.dormitorio": "Bedroom",
      "show.open": "Enlarge photo",
      "show.dlg": "Showroom photos",
      "show.close": "Close",
      "show.prev": "Previous photo",
      "show.next": "Next photo",
      "show.s1": "Living room with a curved camel sofa and wooden coffee tables in the Bella showroom",
      "show.s2": "Wooden dining table with pink chairs and a green plant wall",
      "show.s3": "White bouclé sofa and armchair with marble tables and a golden Buddha head",
      "show.s4": "Sand-coloured upholstered capitonné bed",
      "show.s5": "Solid root-wood dining table and bench",
      "show.s6": "Olive-green living area with natural-fibre lamps and a round dining table",
      "show.s7": "Living room with rattan lamps, wooden mirrors and a corner sofa",
      "show.s8": "Large bouclé corner sofa with swivel armchairs",
      "show.s9": "Beds with lift-up storage bases, wooden mirrors and jute rugs",
      "show.s11": "Living room with a white sofa, wooden coffee table and round dining table under glass pendant lights",
      "show.s10": "Modular sofa by the window, with pampas plumes and a wooden lamp",
      "wl.eyebrow": "Welcome to Bella",
      "wl.title": "Tamara and her team look forward to seeing you",
      "wl.text": "Tamara runs the store in Dehesa de Campoamor. Together with her team she helps you in Spanish, English, Dutch, Danish or German, shows you around the showroom and thinks along with you about what suits your home and terrace.",
      "wl.cta": "Book a personal appointment",
      "vt.eyebrow": "Video tour",
      "vt.title": "Take a walk through the store",
      "vt.p": "One minute through our store in Dehesa de Campoamor: the outdoor floor, the living room corners and the bedroom. And then come and see it in person.",
      "vt.cta": "How to get here",
      "vt.video": "Video: a walk through the Bella store in Dehesa de Campoamor",
      "vt.play": "Watch the video (1 min)",
      "nav.faq": "FAQ",
      "faq.eyebrow": "Frequently asked questions",
      "faq.title": "Good to know",
      "faq.p": "Can't find your question? Call or write to us.",
      "faq.cta": "Ask your question",
      "faq.q1": "Do you deliver to my home?",
      "faq.a1": "Yes. We deliver your furniture to Dehesa de Campoamor, Orihuela Costa, La Zenia, Torrevieja and the surrounding area. Ask us about the conditions for your address.",
      "faq.q2": "Can I see and try the furniture before buying?",
      "faq.a2": "Yes. In our 2,000 m² store on two floors you can sit down, feel the materials and compare colours in person.",
      "faq.q3": "Do I need an appointment to visit the store?",
      "faq.a3": "No. You are welcome without an appointment Monday to Friday 10:00–18:00 and Saturday 10:00–14:00. Furnishing a whole house or several rooms? Then we recommend booking a personal appointment: we help only you, calmly and over a coffee.",
      "faq.q4": "Which materials withstand the coastal climate?",
      "faq.a4": "Sun, salt and wind call for the right materials. In the store we explain which frames, fabrics and finishes hold up best on your terrace, and how to maintain them.",
      "faq.q5": "Which languages do you speak?",
      "faq.a5": "We help you in Spanish, English, Dutch, Danish and German – in the store, by phone and by e-mail.",
      "faq.q6": "Do you also sell online?",
      "faq.a6": "No, we don't have an online shop. On the website you can see a selection and ask for information; you buy in the store, where we advise you in person.",
      "ap.eyebrow": "Personal interior advice",
      "ap.title": "Furnishing your home? Let's start with a coffee.",
      "ap.text": "Whether you've just bought a house or only want to refresh the living room: book a personal appointment and we'll walk through the showroom together. Just you, our team and a plan made to measure.",
      "ap.s1": "Choose a day and time",
      "ap.s2": "Coffee and a plan in store",
      "ap.s3": "We deliver to your home",
      "ap.stamp": "one customer at a time",
      "ap.q": "What would you like to furnish?",
      "ap.o1.t": "The whole house",
      "ap.o1.p": "Villa, apartment or holiday home · 2 h appointment",
      "ap.o2.t": "A few rooms",
      "ap.o2.p": "Living room, bedroom, dining room… · 1 h appointment",
      "ap.note": "No obligation · during opening hours · Mon–Sat",
      "band.eyebrow": "Two floors · 2,000 m²",
      "band.title": "Come and take a seat.",
      "band.text": "Photos give you an idea; in the store you experience it. We advise you calmly, with no obligation.",
      "band.cta": "Plan your visit",
      "band.alt": "View of the Bella showroom with furnished living areas and warm lighting",
      "skip": "Skip to content",
      "menu": "Menu",
      "totop": "Back to top",
      "nav.about": "About us",
      "nav.offer": "What we offer",
      "nav.visit": "Visit us",
      "nav.contact": "Contact",
      "hero.eyebrow": "Outdoor & indoor furniture · Dehesa de Campoamor",
      "hero.title": "Outdoor living, Mediterranean style",
      "hero.lead": "Bella Furniture & Outdoor is your store for outdoor and indoor furniture on the Costa Blanca. Come and see, feel and try in our store.",
      "hero.cta1": "Visit the store",
      "hero.cta2": "Get in touch",
      "about.eyebrow": "About us",
      "about.title": "Your terrace, our passion",
      "about.p1": "At Bella we help you create an outdoor and indoor space you love to be in. From a sunny terrace to a cosy living room: we take the time to give you expert advice.",
      "about.p2": "We are a local store in Dehesa de Campoamor and we know the coastal climate: sun, salt and wind. That is why we recommend materials that last.",
      "offer.eyebrow": "What we offer",
      "offer.title": "Everything for living inside and out",
      "offer.c1.t": "Outdoor furniture",
      "offer.c1.p": "Lounge sets, dining tables and sun loungers for terrace, garden and pool.",
      "offer.c2.t": "Shade",
      "offer.c2.p": "Parasols and shade solutions so you can enjoy the outdoors all day.",
      "offer.c3.t": "Indoor furniture",
      "offer.c3.p": "Furniture with a Mediterranean touch for your house or apartment.",
      "offer.c4.t": "Advice",
      "offer.c4.p": "We help you choose what suits your space, your style and your budget.",
      "about.map": "Map: Bella Furniture & Outdoor, Polígono A-2 La Regía Oeste, Dehesa de Campoamor",
      "about.mapLink": "View larger map",
      "hours.mf": "Monday to Friday",
      "hours.sat": "Saturday",
      "hours.sun": "Sunday",
      "hours.closed": "Closed",
      "visit.eyebrow": "Visit us",
      "visit.title": "Drop by the store",
      "visit.p": "The best way to choose furniture is to see it in person. We look forward to welcoming you in our store in Dehesa de Campoamor.",
      "visit.address": "Address",
      "visit.hours": "Opening hours",
      "visit.route": "Get directions",
      "visit.photo": "Storefront of Bella Outdoor & Furniture in Dehesa de Campoamor",
      "hero.flyers": "Bella Outdoor & Furniture flyers",
      "contact.eyebrow": "Contact",
      "contact.title": "Any questions?",
      "contact.p": "Call us or send us a message. We reply in Spanish, English, Dutch, Danish or German.",
      "contact.phone": "Phone",
      "form.name": "Name",
      "form.email": "E-mail",
      "form.phone": "Phone (optional)",
      "form.message": "Message",
      "form.privacy": "I agree to my data being used to answer my enquiry.",
      "form.send": "Send",
      "form.sending": "Sending…",
      "form.ok": "Thank you! We will get back to you soon.",
      "form.error": "Please fill in your name, a valid e-mail, a message and accept the privacy terms.",
      "form.fail": "Something went wrong. Please try again or contact us by phone.",
      "legal.notice": "Legal notice",
      "legal.privacy": "Privacy policy",
      "nav.bali": "Bali collection",
      "brands.eyebrow": "Our brands",
      "brands.title": "Brands you can see and try in our store",
      "brands.lead": "At Bella we combine our own selection with leading outdoor furniture brands. We chose them for their design and because they stand up to the coastal climate: sun, salt and wind.",
      "brands.life": "Outdoor lounge and dining sets with clean lines and durable materials.",
      "brands.suns": "Garden and lounge furniture with a contemporary design, for terrace, garden and pool.",
      "brands.note": "Come and see them in our 2,000 m² showroom in Dehesa de Campoamor. We are happy to advise you.",
      "bali.eyebrow": "Bali collection · HomeDecoBali",
      "bali.title": "Handmade in Bali",
      "bali.lead": "A selection of handcrafted decoration and furniture from HomeDecoBali, available through our store in Campoamor. Click a product to ask us about it.",
      "bali.cta": "Discover the Bali collection",
      "bp.eyebrow": "Bella Furniture & Outdoor · in collaboration with HomeDecoBali",
      "bp.title": "The Bali collection",
      "bp.lead": "Handmade by artisan families in Bali: wood, rattan, capiz shell and natural fibres. Every visit shows a new selection of four pieces per category.",
      "bp.note": "We do not sell online. Ask us about any piece, or come and see the collection in our store in Dehesa de Campoamor.",
      "bp.shuffle": "Show other products",
      "bp.loading": "Loading the collection…",
      "bp.cta.title": "Looking for something specific?",
      "bp.cta.p": "The full HomeDecoBali range is available through us. Tell us what you are looking for and we will help you.",
      "brands.more": "More information",
      "brands.inStore": "In our 2,000 m² showroom:",
      "brands.plan": "Plan your visit",
      "brands.advice": "Ask for advice",
      "reviews.eyebrow": "Reviews",
      "reviews.title": "What our customers say",
      "sticky.quote": "Request a quote",
      "sticky.call": "Call the store",
      "ask.title": "Been to our store? Tell us what you thought",
      "ask.p": "Your review helps other people on the coast find us, and helps us get better. Leaving a Google review only takes a minute.",
      "ask.cta": "Write a Google review",
      "ask.thanks": "Thank you so much for your support!",
      "ask.qr": "Scan with your phone",
      "ask.qrAlt": "QR code to write a Google review",
      "ask.footer": "Write a review",
      "footer.branches": "You will also find Bella in",
      "footer.indoor": "(indoor)",
      "footer.outdoor": "(outdoor & kitchens)",
      "nav.appt": "Book a visit",
      "visit.appt": "Book a personal appointment",
      "appt.eyebrow": "Personal appointment",
      "appt.title": "Our full attention, just for you",
      "appt.lead": "Furnishing a whole house or several rooms? Book an appointment and we will take all the time you need: with a coffee, no rush and no other customers at the same time.",
      "appt.p1": "With a coffee, at your own pace",
      "appt.p2": "An adviser just for you",
      "appt.p3": "We walk through our 2,000 m² together and plan every room",
      "appt.p4": "In Spanish, English, Dutch, Danish or German",
      "appt.s1": "How much time do you need?",
      "appt.d60": "A few rooms",
      "appt.d120": "Recommended for a house",
      "appt.d180": "Large house or villa",
      "appt.s2": "Choose a day and time",
      "appt.prevWeek": "Previous week",
      "appt.nextWeek": "Next week",
      "appt.loading": "Loading the calendar…",
      "appt.s3": "Your details",
      "appt.your": "Your appointment",
      "appt.pick": "Choose a day and time",
      "appt.phone": "Phone",
      "appt.scope": "What would you like to furnish?",
      "appt.sc.casa": "A whole house",
      "appt.sc.varias": "Several rooms",
      "appt.sc.exterior": "Terrace / garden",
      "appt.sc.otro": "Other",
      "appt.people": "People",
      "appt.area": "Area / type of home (optional)",
      "appt.areaPh": "e.g. villa in Campoamor, 3 bedrooms",
      "appt.msg": "Anything we should know? (optional)",
      "appt.msgPh": "Style, rooms, timing, budget…",
      "appt.send": "Request appointment",
      "appt.note": "Your appointment is provisional until we confirm it by phone or e-mail.",
      "appt.doneEyebrow": "Request received",
      "appt.doneTitle": "Thank you! The coffee will be ready",
      "appt.doneText": "We have received your request. We will confirm your appointment by phone or e-mail as soon as possible.",
      "appt.doneAddr": "Where",
      "appt.doneShow": "View the showroom"
    },
    nl: {
      "nav.showroom": "Showroom",
      "show.eyebrow": "Onze showroom",
      "show.title": "2.000 m² inspiratie",
      "show.lead": "Wandel langs volledig ingerichte woonkamers, eethoeken en slaapkamers. Ga zitten, voel de stoffen en zie hoe elk stuk staat in een echte opstelling.",
      "show.filter": "Foto's filteren",
      "show.all": "Alles",
      "show.f.salon": "Woonkamers",
      "show.f.comedor": "Eetkamers",
      "show.f.dormitorio": "Slaapkamers",
      "show.cat.salon": "Woonkamer",
      "show.cat.comedor": "Eetkamer",
      "show.cat.dormitorio": "Slaapkamer",
      "show.open": "Foto vergroten",
      "show.dlg": "Foto's van de showroom",
      "show.close": "Sluiten",
      "show.prev": "Vorige foto",
      "show.next": "Volgende foto",
      "show.s1": "Woonkamer met een gebogen bank in camel en houten salontafels in de showroom van Bella",
      "show.s2": "Houten eettafel met roze stoelen en een plantenwand",
      "show.s3": "Witte bouclé bank en fauteuil met marmeren tafels en een gouden Boeddhahoofd",
      "show.s4": "Gestoffeerd capitonné bed in zandtinten",
      "show.s5": "Massief houten eettafel en bank van wortelhout",
      "show.s6": "Woonhoek in olijfgroen met lampen van natuurvezel en een ronde eettafel",
      "show.s7": "Woonkamer met rotan lampen, houten spiegels en een hoekbank",
      "show.s8": "Grote bouclé hoekbank met draaifauteuils",
      "show.s9": "Bedden met opklapbare opbergbodem, houten spiegels en jute vloerkleden",
      "show.s11": "Woonkamer met witte bank, houten salontafel en ronde eettafel onder glazen hanglampen",
      "show.s10": "Modulaire bank bij het raam, met pampaspluimen en een houten lamp",
      "wl.eyebrow": "Welkom bij Bella",
      "wl.title": "Tamara en haar team verwelkomen u graag",
      "wl.text": "Tamara leidt de winkel in Dehesa de Campoamor. Samen met haar team helpt ze u in het Spaans, Engels, Nederlands, Deens of Duits, leidt u rond door de showroom en denkt met u mee over wat bij uw huis en terras past.",
      "wl.cta": "Maak een persoonlijke afspraak",
      "vt.eyebrow": "Videotour",
      "vt.title": "Loop even door de winkel",
      "vt.p": "Eén minuut door onze winkel in Dehesa de Campoamor: de buitenverdieping, de zithoeken en de slaapkamer. En kom het daarna in het echt bekijken.",
      "vt.cta": "Route",
      "vt.video": "Video: een wandeling door de Bella-winkel in Dehesa de Campoamor",
      "vt.play": "Bekijk de video (1 min)",
      "nav.faq": "Vragen",
      "faq.eyebrow": "Veelgestelde vragen",
      "faq.title": "Goed om te weten",
      "faq.p": "Staat uw vraag er niet bij? Bel of mail ons.",
      "faq.cta": "Stel uw vraag",
      "faq.q1": "Bezorgen jullie aan huis?",
      "faq.a1": "Ja. We bezorgen uw meubelen in Dehesa de Campoamor, Orihuela Costa, La Zenia, Torrevieja en omgeving. Vraag ons naar de voorwaarden voor uw adres.",
      "faq.q2": "Kan ik de meubelen zien en proberen voordat ik koop?",
      "faq.a2": "Ja. In onze winkel van 2.000 m² op twee verdiepingen kunt u zitten, de materialen voelen en kleuren in het echt vergelijken.",
      "faq.q3": "Moet ik een afspraak maken om de winkel te bezoeken?",
      "faq.a3": "Nee. U bent zonder afspraak welkom van maandag t/m vrijdag 10:00–18:00 en op zaterdag 10:00–14:00. Richt u een heel huis of meerdere ruimtes in? Dan raden we een persoonlijke afspraak aan: we helpen alleen u, rustig en met een kop koffie.",
      "faq.q4": "Welke materialen kunnen tegen het kustklimaat?",
      "faq.a4": "Zon, zout en wind vragen om de juiste materialen. In de winkel leggen we uit welke frames, stoffen en afwerkingen het best standhouden op uw terras, en hoe u ze onderhoudt.",
      "faq.q5": "In welke talen kunnen jullie me helpen?",
      "faq.a5": "We helpen u in het Spaans, Engels, Nederlands, Deens en Duits – in de winkel, telefonisch en per e-mail.",
      "faq.q6": "Verkopen jullie ook online?",
      "faq.a6": "Nee, we hebben geen webshop. Op de website ziet u een selectie en kunt u informatie aanvragen; kopen doet u in de winkel, waar we u persoonlijk adviseren.",
      "ap.eyebrow": "Persoonlijk interieuradvies",
      "ap.title": "Uw woning inrichten? We beginnen met koffie.",
      "ap.text": "Of u nu net een huis heeft gekocht of alleen de woonkamer wilt vernieuwen: maak een persoonlijke afspraak en we lopen samen door de showroom. Alleen u, ons team en een plan op maat.",
      "ap.s1": "Kies een dag en tijd",
      "ap.s2": "Koffie en een plan in de winkel",
      "ap.s3": "Wij leveren bij u thuis",
      "ap.stamp": "één klant tegelijk",
      "ap.q": "Wat wilt u inrichten?",
      "ap.o1.t": "Het hele huis",
      "ap.o1.p": "Villa, appartement of vakantiewoning · afspraak van 2 uur",
      "ap.o2.t": "Een paar ruimtes",
      "ap.o2.p": "Woonkamer, slaapkamer, eetkamer… · afspraak van 1 uur",
      "ap.note": "Vrijblijvend · tijdens openingstijden · ma–za",
      "band.eyebrow": "Twee verdiepingen · 2.000 m²",
      "band.title": "Kom gerust zitten.",
      "band.text": "Foto's geven een idee; in de winkel beleeft u het. We adviseren u rustig en vrijblijvend.",
      "band.cta": "Plan uw bezoek",
      "band.alt": "Zicht op de showroom van Bella met ingerichte woonhoeken en warme verlichting",
      "skip": "Naar de inhoud",
      "menu": "Menu",
      "totop": "Terug naar boven",
      "nav.about": "Over ons",
      "nav.offer": "Wat we bieden",
      "nav.visit": "Bezoek ons",
      "nav.contact": "Contact",
      "hero.eyebrow": "Buiten- en binnenmeubelen · Dehesa de Campoamor",
      "hero.title": "Buiten leven in mediterrane stijl",
      "hero.lead": "Bella Furniture & Outdoor is uw winkel voor buiten- en binnenmeubelen aan de Costa Blanca. Kom kijken, voelen en proberen in onze winkel.",
      "hero.cta1": "Bezoek de winkel",
      "hero.cta2": "Neem contact op",
      "about.eyebrow": "Over ons",
      "about.title": "Uw terras, onze passie",
      "about.p1": "Bij Bella helpen we u een buiten- en binnenruimte te creëren waar u graag bent. Van een zonnig terras tot een gezellige woonkamer: we adviseren u rustig en met kennis van zaken.",
      "about.p2": "We zijn een lokale winkel in Dehesa de Campoamor en kennen het kustklimaat: zon, zout en wind. Daarom raden we materialen aan die tegen een stootje kunnen.",
      "offer.eyebrow": "Wat we bieden",
      "offer.title": "Alles voor binnen en buiten",
      "offer.c1.t": "Buitenmeubelen",
      "offer.c1.p": "Loungesets, eettafels en ligbedden voor terras, tuin en zwembad.",
      "offer.c2.t": "Schaduw",
      "offer.c2.p": "Parasols en schaduwoplossingen om de hele dag buiten te genieten.",
      "offer.c3.t": "Binnenmeubelen",
      "offer.c3.p": "Meubelen met een mediterrane touch voor uw huis of appartement.",
      "offer.c4.t": "Advies",
      "offer.c4.p": "We helpen u kiezen wat past bij uw ruimte, uw stijl en uw budget.",
      "about.map": "Kaart: Bella Furniture & Outdoor, Polígono A-2 La Regía Oeste, Dehesa de Campoamor",
      "about.mapLink": "Grotere kaart bekijken",
      "hours.mf": "Maandag t/m vrijdag",
      "hours.sat": "Zaterdag",
      "hours.sun": "Zondag",
      "hours.closed": "Gesloten",
      "visit.eyebrow": "Bezoek ons",
      "visit.title": "Kom langs in de winkel",
      "visit.p": "Meubelen kiest u het best door ze in het echt te zien. We verwelkomen u graag in onze winkel in Dehesa de Campoamor.",
      "visit.address": "Adres",
      "visit.hours": "Openingstijden",
      "visit.route": "Routebeschrijving",
      "visit.photo": "Gevel van de winkel Bella Outdoor & Furniture in Dehesa de Campoamor",
      "hero.flyers": "Folders van Bella Outdoor & Furniture",
      "contact.eyebrow": "Contact",
      "contact.title": "Heeft u een vraag?",
      "contact.p": "Bel ons of stuur een bericht. We antwoorden in het Spaans, Engels, Nederlands, Deens of Duits.",
      "contact.phone": "Telefoon",
      "form.name": "Naam",
      "form.email": "E-mail",
      "form.phone": "Telefoon (optioneel)",
      "form.message": "Bericht",
      "form.privacy": "Ik ga akkoord met het gebruik van mijn gegevens om mijn vraag te beantwoorden.",
      "form.send": "Versturen",
      "form.sending": "Bezig met versturen…",
      "form.ok": "Bedankt! We nemen snel contact met u op.",
      "form.error": "Vul uw naam, een geldig e-mailadres en een bericht in en accepteer de privacyvoorwaarden.",
      "form.fail": "Er ging iets mis. Probeer het opnieuw of neem telefonisch contact op.",
      "legal.notice": "Juridische informatie",
      "legal.privacy": "Privacybeleid",
      "nav.bali": "Bali-collectie",
      "brands.eyebrow": "Onze merken",
      "brands.title": "Merken die u in de winkel kunt zien en proberen",
      "brands.lead": "Bij Bella combineren we onze eigen selectie met toonaangevende merken in buitenmeubelen. We kozen ze om hun design en omdat ze tegen het kustklimaat kunnen: zon, zout en wind.",
      "brands.life": "Lounge- en diningsets voor buiten, met strakke lijnen en duurzame materialen.",
      "brands.suns": "Tuin- en loungemeubelen met een eigentijds design, voor terras, tuin en zwembad.",
      "brands.note": "Kom ze bekijken in onze showroom van 2.000 m² in Dehesa de Campoamor. We adviseren u graag.",
      "bali.eyebrow": "Bali-collectie · HomeDecoBali",
      "bali.title": "Handgemaakt op Bali",
      "bali.lead": "Een selectie handgemaakte decoratie en meubelen van HomeDecoBali, verkrijgbaar via onze winkel in Campoamor. Klik op een product om ons er iets over te vragen.",
      "bali.cta": "Ontdek de Bali-collectie",
      "bp.eyebrow": "Bella Furniture & Outdoor · in samenwerking met HomeDecoBali",
      "bp.title": "De Bali-collectie",
      "bp.lead": "Handgemaakt door ambachtelijke families op Bali: hout, rotan, capizschelp en natuurlijke vezels. Bij elk bezoek ziet u een nieuwe selectie van vier stuks per categorie.",
      "bp.note": "We verkopen niet online. Vraag ons naar elk product, of kom de collectie bekijken in onze winkel in Dehesa de Campoamor.",
      "bp.shuffle": "Andere producten tonen",
      "bp.loading": "Collectie wordt geladen…",
      "bp.cta.title": "Op zoek naar iets bijzonders?",
      "bp.cta.p": "Het volledige assortiment van HomeDecoBali is via ons verkrijgbaar. Vertel ons wat u zoekt en we helpen u graag.",
      "brands.more": "Meer informatie",
      "brands.inStore": "In onze showroom van 2.000 m²:",
      "brands.plan": "Plan uw bezoek",
      "brands.advice": "Vraag advies",
      "reviews.eyebrow": "Reviews",
      "reviews.title": "Wat onze klanten zeggen",
      "sticky.quote": "Offerte aanvragen",
      "sticky.call": "Bel de winkel",
      "ask.title": "Al bij ons geweest? Vertel ons wat u ervan vond",
      "ask.p": "Uw review helpt andere mensen aan de kust ons te vinden, en helpt ons beter te worden. Een Google-review schrijven kost maar een minuutje.",
      "ask.cta": "Schrijf een Google-review",
      "ask.thanks": "Heel erg bedankt voor uw steun!",
      "ask.qr": "Scan met uw telefoon",
      "ask.qrAlt": "QR-code om een Google-review te schrijven",
      "ask.footer": "Schrijf een review",
      "footer.branches": "U vindt Bella ook in",
      "footer.indoor": "(interieur)",
      "footer.outdoor": "(buiten & keukens)",
      "nav.appt": "Afspraak maken",
      "visit.appt": "Maak een persoonlijke afspraak",
      "appt.eyebrow": "Persoonlijke afspraak",
      "appt.title": "Al onze aandacht, alleen voor u",
      "appt.lead": "Richt u een heel huis of meerdere ruimtes in? Maak een afspraak en we nemen alle tijd voor u: met een kop koffie, zonder haast en zonder andere klanten tegelijk.",
      "appt.p1": "Met een kop koffie, in uw eigen tempo",
      "appt.p2": "Een adviseur alleen voor u",
      "appt.p3": "Samen door onze 2.000 m² en elke ruimte doordenken",
      "appt.p4": "In het Spaans, Engels, Nederlands, Deens of Duits",
      "appt.s1": "Hoeveel tijd heeft u nodig?",
      "appt.d60": "Een paar ruimtes",
      "appt.d120": "Aanbevolen voor een huis",
      "appt.d180": "Groot huis of villa",
      "appt.s2": "Kies een dag en tijd",
      "appt.prevWeek": "Vorige week",
      "appt.nextWeek": "Volgende week",
      "appt.loading": "Agenda wordt geladen…",
      "appt.s3": "Uw gegevens",
      "appt.your": "Uw afspraak",
      "appt.pick": "Kies een dag en tijd",
      "appt.phone": "Telefoon",
      "appt.scope": "Wat wilt u inrichten?",
      "appt.sc.casa": "Een heel huis",
      "appt.sc.varias": "Meerdere ruimtes",
      "appt.sc.exterior": "Terras / tuin",
      "appt.sc.otro": "Anders",
      "appt.people": "Personen",
      "appt.area": "Plaats / type woning (optioneel)",
      "appt.areaPh": "bijv. villa in Campoamor, 3 slaapkamers",
      "appt.msg": "Iets wat we moeten weten? (optioneel)",
      "appt.msgPh": "Stijl, ruimtes, planning, budget…",
      "appt.send": "Afspraak aanvragen",
      "appt.note": "Uw afspraak is voorlopig tot we die telefonisch of per e-mail bevestigen.",
      "appt.doneEyebrow": "Aanvraag ontvangen",
      "appt.doneTitle": "Dank u! De koffie staat klaar",
      "appt.doneText": "We hebben uw aanvraag ontvangen. We bevestigen de afspraak zo snel mogelijk telefonisch of per e-mail.",
      "appt.doneAddr": "Waar",
      "appt.doneShow": "Bekijk de showroom"
    },
    es: {
      "show.open": "Ampliar foto",
      "show.dlg": "Fotos de la exposición",
      "show.close": "Cerrar",
      "show.prev": "Foto anterior",
      "show.next": "Foto siguiente",
      "show.filter": "Filtrar fotos",
      "totop": "Volver arriba",
      "sticky.call": "Llamar a la tienda",
      "form.sending": "Enviando…",
      "form.ok": "¡Gracias! Le responderemos pronto.",
      "form.error": "Rellene su nombre, un e-mail válido y un mensaje, y acepte la política de privacidad.",
      "form.fail": "Algo salió mal. Inténtelo de nuevo o contáctenos por teléfono.",
      "appt.prevWeek": "Semana anterior",
      "appt.nextWeek": "Semana siguiente"
    }
  };

  // Spaanse teksten staan in de HTML: bewaar ze als origineel
  var nodes = document.querySelectorAll("[data-i18n]");
  nodes.forEach(function (el) {
    var k = el.getAttribute("data-i18n");
    if (!(k in T.es)) T.es[k] = el.textContent;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
    var k = el.getAttribute("data-i18n-aria");
    if (!(k in T.es)) T.es[k] = "Menú";
  });
  var titles = document.querySelectorAll("[data-i18n-title]");
  titles.forEach(function (el) {
    var k = el.getAttribute("data-i18n-title");
    if (!(k in T.es)) T.es[k] = el.getAttribute("title");
  });
  var alts = document.querySelectorAll("[data-i18n-alt]");
  alts.forEach(function (el) {
    var k = el.getAttribute("data-i18n-alt");
    if (!(k in T.es)) T.es[k] = el.getAttribute("alt");
  });

  var phs = document.querySelectorAll("[data-i18n-ph]");
  phs.forEach(function (el) {
    var k = el.getAttribute("data-i18n-ph");
    if (!(k in T.es)) T.es[k] = el.getAttribute("placeholder");
  });

  var current = "es";
  function t(k) { return (T[current] && T[current][k]) || T.es[k] || ""; }

  function setLang(lang) {
    if (!T[lang]) lang = "es";
    current = lang;
    document.documentElement.lang = lang;
    nodes.forEach(function (el) {
      var v = t(el.getAttribute("data-i18n"));
      if (v) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });
    titles.forEach(function (el) {
      var v = t(el.getAttribute("data-i18n-title"));
      if (v) el.setAttribute("title", v);
    });
    alts.forEach(function (el) {
      var v = t(el.getAttribute("data-i18n-alt"));
      if (v) el.setAttribute("alt", v);
    });
    phs.forEach(function (el) {
      var v = t(el.getAttribute("data-i18n-ph"));
      if (v) el.setAttribute("placeholder", v);
    });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
    var hidden = document.querySelector('#contact-form input[name="language"]');
    if (hidden) hidden.value = lang;
    window.BELLA_LANG = lang;
    try { document.dispatchEvent(new CustomEvent("bella:lang", { detail: lang })); } catch (e) {}
  }

  // Elke taal heeft een eigen URL (ES = /, EN = /en/, NL = /nl/) voor Google.
  // De HTML is al vertaald door tools/build-lang.mjs; de taalknoppen zijn gewone links.
  var PAGE_LANG = T[document.documentElement.lang] ? document.documentElement.lang : "es";
  function langUrl(lang) {
    var path = location.pathname.replace(/^\/(en|nl)(\/|$)/, "/");
    if (lang !== "es") path = "/" + lang + path;
    return path + location.search.replace(/([?&])lang=[a-z]+&?/, "$1").replace(/[?&]$/, "") + location.hash;
  }
  document.querySelectorAll(".lang a[data-lang]").forEach(function (a) {
    a.addEventListener("click", function () {
      try { localStorage.setItem("bella-lang", a.getAttribute("data-lang")); } catch (e) {}
    });
  });

  // Oude links met ?lang=en en een eerder gekozen taal: door naar de juiste URL
  try {
    var q = new URLSearchParams(location.search).get("lang");
    var stored = localStorage.getItem("bella-lang");
    var want = (q && T[q]) ? q : ((stored && T[stored]) ? stored : null);
    if (q && T[q]) localStorage.setItem("bella-lang", q);
    if (want && want !== PAGE_LANG && location.protocol !== "file:") { location.replace(langUrl(want)); return; }
  } catch (e) {}
  setLang(PAGE_LANG);

  // Mobiel menu
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("open");
      });
    });
  }

  // Header compact bij scrollen
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 20); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Jaartal
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Contactformulier
  var form = document.getElementById("contact-form");
  if (form) {
    var status = form.querySelector(".form-status");
    var cfg = window.BELLA_CONFIG || {};
    function show(msg, cls) { status.textContent = msg; status.className = "form-status " + (cls || ""); }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var email = String(d.get("email") || "").trim();
      if (!String(d.get("name") || "").trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
          !String(d.get("message") || "").trim() || !d.get("privacy")) {
        show(t("form.error"), "error");
        return;
      }
      var data = {
        name: d.get("name"), email: email, phone: d.get("phone"),
        message: d.get("message"), language: current, website: d.get("website") || ""
      };

      if (cfg.contactWebhook) {
        var btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        show(t("form.sending"));
        fetch(cfg.contactWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }).then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.reset();
          show(t("form.ok"), "ok");
        }).catch(function () {
          show(t("form.fail"), "error");
        }).finally(function () { btn.disabled = false; });
      } else if (cfg.contactEmail) {
        var body = data.message + "\n\n" + data.name + "\n" + data.email + (data.phone ? "\n" + data.phone : "");
        location.href = "mailto:" + cfg.contactEmail +
          "?subject=" + encodeURIComponent("Consulta web – " + data.name) +
          "&body=" + encodeURIComponent(body);
      } else {
        show(t("form.fail"), "error");
      }
    });
  }

  // Knop "terug naar boven": verschijnt na een stukje scrollen
  var toTop = document.querySelector(".to-top");
  if (toTop) {
    toTop.hidden = false;
    var onScroll = function () {
      toTop.classList.toggle("is-visible", window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    toTop.addEventListener("click", function (e) {
      e.preventDefault();
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      var brand = document.querySelector(".brand");
      if (brand) brand.focus({ preventScroll: true });
    });
  }

  // Videotour: pas laden bij klikken
  var vbox = document.getElementById("video");
  if (vbox) {
    var vv = vbox.querySelector("video"), vb = vbox.querySelector(".video-play");
    vv.removeAttribute("controls");
    vb.addEventListener("click", function () { vbox.classList.add("playing"); vv.setAttribute("controls", ""); vv.play(); });
    vv.addEventListener("play", function () { vbox.classList.add("playing"); });
  }
})();
