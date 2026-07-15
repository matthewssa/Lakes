const zones = [
    {
        zoneName: "Miene's Bedroom",
        levelRange: "0-0",
        dangerLevel: 1,
        description: "Miene is nestled comfortably on her opulent bed, draped in a cascade of silken pillows, her mind swirling with dreams and possibilities. As she gazes thoughtfully at the twinkling stars visible through her ornate window, she wonders what adventures await her today.",
        actions: [
            {
				name: "MB_sit_on_bed", 
				displayName: "Sit On Bed", // Display text for the action panel button
                actionFunction: "Sit On Bed", // Display text for the story panel title
                time: 1,  // Time in minutes
				pictime: 10,
				imageSrcs: ["images/resting1.png", "images/resting2.png", "images/resting3.png", "images/resting4.png", "images/resting5.png", "images/resting6.png", "images/resting7.png", "images/resting8.png"]
            },
            {
                name: "MB_lookinmirror",
				displayName: "Look in the Mirror",
                actionFunction: "Looking in the Mirror", 
                time: 1,
				pictime: 10,
				imageSrcs: ["images/looking_in_the_mirror3.png", "images/looking_in_the_mirror7.png"]  
            },
            {
                name: "MB_openwardrobe",
				displayName: "Open Wardrobe",
                actionFunction: "Open Wardrobe",
                time: 1,
				pictime: 10,
				imageSrcs: ["images/open_wardrobe1.png", "images/open_wardrobe2.png"]  
            },
			{
                name: "MB_mini_bar",
				displayName: "Mini Bar",
                actionFunction: "Mini Bar",
                time: 1,
				pictime: 10,
				imageSrcs: ["images/open_wardrobe1.png", "images/open_wardrobe2.png"] 
            }
        ]
    },
    {
        zoneName: "Sit On Bed",
        levelRange: "0-0",
        dangerLevel: 0,
        description: "Miene flopped onto her bed with a dramatic sigh, as if the mattress itself had been waiting for her all day. \"Finally, my kingdom of blankets and pillows!\" she declared, grinning mischievously as she sank into the softness, her body instantly embracing the cozy rebellion against the world",
        actions: [
            {
                name: "MB_rest",
				displayName: "Nap",
                actionFunction: "Nap",
                time: 10,
				pictime: 10,
				description: "Miene snuggled into her bed, her book forgotten beside her, as she drifted off for a quick nap. Her eyes fluttered shut, but not before she mumbled, “Just five more minutes... I swear.” A few minutes later, she was already snoring softly, her hands twitching as if fighting off imaginary villains in her dreams. Every so often, she'd let out a tiny giggle, as if secretly winning the battle of sneaking snacks away from the castle maids. \"You can’t catch me!\" she mumbled, her smile widening in her sleep. If only her dreams were as heroic as her snacks were delicious.",
				imageSrcs: ["images/waking_up1.png"]
            },
            {
                name: "MB_sleep",
				displayName: "Sleep",
                actionFunction: "Sleep",
                time: 480,
				pictime: 10,
				description: "Miene lay sprawled out on her bed, snuggled under a blanket like a burrito, her hair a mess of tangled strands around her pillow. A soft snore escaped her lips, almost as if she were proudly announcing to the world that she was, in fact, the queen of naps. One hand was half hanging off the bed, probably dreaming of snacks she couldn’t reach. The room was silent except for the occasional rustle of the curtains, as if even the breeze was tiptoeing around her to avoid waking her from her perfectly adorable slumber.",
				imageSrcs: ["images/waking_up1.png"] 
            },
			{
                name: "MB_read_book",
				displayName: "Read A Book",
                actionFunction: "Read A Book",
                time: 60,
				pictime: 10,
				description: "Miene curled up on her cozy bed, a soft blanket wrapped around her, completely absorbed in the book she was reading. Her eyes sparkled with curiosity, but every so often, she'd pause, furrow her brow, and mutter to herself, \"Wait... that totally wouldn't happen!\" She rolled her eyes dramatically, then continued flipping through the pages, a small giggle escaping her as she imagined herself in the wacky scenarios. Occasionally, she’d bite her lip, pretending to be deep in thought, only to be distracted by a stray thought of snacks—because who could read without snacks?",
				imageSrcs: ["images/waking_up1.png"] 
            },
			{
                name: "MB_masturbate",
				displayName: "Sleep",
                actionFunction: "Sleep",
                time: 30,
				pictime: 10,
				arousal: 5,
				corruption: 1,
				description: "asdf",
				imageSrcs: ["images/waking_up1.png"] 
            },
            {
                name: "MB_leave_bed",
				displayName: "Leave Bed",
                actionFunction: "Miene's Bedroom",
                time: 5,
				pictime: 10,
				description: "Miene groggily rolled out of bed, her limbs a tangled mess of blankets. \"Ugh, why does getting up always feel like a quest?\" she grumbled, yawning dramatically, already plotting her return to the comfort of her bed.",
				imageSrcs: ["images/waking_up1.png"] 
            }
        ]
    },	
    {
        zoneName: "Mini Bar",
        levelRange: "0-0",
        dangerLevel: 0,
        description: "Miene leans against her cozy mini bar, her fingers tracing the edge of the counter as she thoughtfully looks over her collection of drinks. It’s a quiet moment, perfect for deciding what might suit her mood..",
        actions: [
			{
                name: "MB_drink_Wine",
				displayName: "Drink Wine",
                actionFunction: "Drink Wine",
                time: 10,
				pictime: 10,
				alcoholPercentage: 12,
				description: "Miene savors a glass of wine, its rich aroma and smooth taste bringing a moment of quiet indulgence.",
				imageSrcs: ["images/waking_up1.png"]
         },
			{
                name: "MB_drink_amaretto",
				displayName: "Drink Amaretto",
                actionFunction: "Drink Amaretto",
                time: 5,
				pictime: 10,
				alcoholPercentage: 24,
				description: "Miene sips the amaretto, its sweet, nutty flavor warming her with a comforting sense of luxury.",
				imageSrcs: ["images/waking_up1.png"] 
            },
			{
                name: "MB_drink_vodka",
				displayName: "Drink Vodka",
                actionFunction: "Drink Vodka",
                time: 5,
				pictime: 10,
				alcoholPercentage: 40,
				description: "Miene wrinkles her nose as she takes a sip of vodka, the sharp burn catching her off guard. She shakes her head, muttering to herself, 'Why do people even drink this stuff?",
				imageSrcs: ["images/waking_up1.png"] 
            },
			{
                name: "MB_drink_whiskey",
				displayName: "Drink Whiskey",
                actionFunction: "Drink Whiskey",
                time: 10,
				pictime: 10,
				alcoholPercentage: 40,
				description: "Miene takes a slow sip of whiskey, wincing as the strong, smoky flavor hits her. She pauses, then chuckles to herself, 'I think I need a few more of these to actually enjoy it... or maybe not.'",
				imageSrcs: ["images/waking_up1.png"] 
            },
			{
                name: "MB_drink_scotch",
				displayName: "Drink Scotch",
                actionFunction: "Drink Scotch",
                time: 10,
				pictime: 10,
				alcoholPercentage: 40,
				description: "Miene hesitates before taking a sip of scotch, the bold, peaty flavor instantly warming her throat. She winces slightly, then grins, 'Well, it’s definitely an acquired taste… maybe I’ll get used to it... maybe not.'",
				imageSrcs: ["images/waking_up1.png"]
            },
			{
                name: "MB_drink_rum",
				displayName: "Drink Rum",
                actionFunction: "Drink Rum",
                time: 5,
				pictime: 10,
				alcoholPercentage: 40,
				description: "Miene scrunches her nose as she takes a sip of rum. The sweetness hits first, but then the sharp bite follows, making her immediately regret the decision. 'I swear, rum's trying to ruin my night,' she mutters, setting the glass down with a little more force than necessary.",
				imageSrcs: ["images/waking_up1.png"] 	
            },
			{
                name: "MB_drink_tequila",
				displayName: "Drink Tequila",
                actionFunction: "Drink Tequila",
                time: 5,
				pictime: 10,
				alcoholPercentage: 40,
				description: "Miene takes a hesitant sip of tequila, wincing as the strong, fiery taste burns down her throat. 'I forgot why I don't like this stuff,' she mutters, shaking her head. With a grimace, she places the glass back down, vowing to never repeat this mistake.",
				imageSrcs: ["images/waking_up1.png"] 
            },
            {
                name: "MB_leave_mini_bar",
				displayName: "Leave Mini Bar",
                actionFunction: "Miene's Bedroom",
                time: 1,
				pictime: 10,
				description: "Miene lets out a soft sigh as she steps away from the mini bar, her drink forgotten for now. She turns, her heels clicking softly on the floor as she makes her way back to the comfort of her bed. The room feels quieter now, the gentle hum of the evening settling around her as she prepares to relax in her cozy haven.",
				imageSrcs: ["images/waking_up1.png"] 
            }
        ]
    },
    {
        zoneName: "Looking in the Mirror", 
        levelRange: "0-0",
        dangerLevel: 0,
        description: "Miene looks into the mirror",
        actions: [
            {
				name: "MB_fixhair", 
				displayName: "Fix Hair",
                actionFunction: "Fix Hair",
                time: 15,
				pictime: 10,
				description: "Miene fixes her hair.",
				imageSrcs: ["images/fixhair1.png", "images/fixhair2.png", "images/fixhair3.png", "images/fixhair4.png"]
            },
            {
				name: "MB_applymakeup",
				displayName: "Apply Makeup",
                actionFunction: "Apply Makeup",
                time: 10,
				pictime: 10,
				description: "Miene applies makeup.",
				imageSrcs: ["images/waking_up1.png"] 
            },
            {
                name: "MB_leavemirror", 
				displayName: "Leave Mirror",
                actionFunction: "Miene's Bedroom",
                time: 0,
				pictime: 10,
				description: "Miene leaves the mirror.",
				imageSrcs: ["images/leave_mirror1.png", "images/leave_mirror2.png"]
            }
        ]
    },
];