import {test,expect} from '@playwright/test';    

test('create booking using dynamic roomid and booking dates', async ({ request, page }) => {

    const checkin = new Date();
    checkin.setDate(checkin.getDate() + 7);
    const checkout = new Date(checkin);
    checkout.setDate(checkout.getDate() + 2);
    const checkinDate = checkin.toISOString().split('T')[0];
    const checkoutDate = checkout.toISOString().split('T')[0];
    const roomResponse = await request.get(
    `https://automationintesting.online/api/room?checkin=${checkinDate}&checkout=${checkoutDate}`
);

expect(roomResponse.status()).toBe(200);
const body = await roomResponse.json();
console.log('Available rooms:', body);
//const availableRoomId = body.rooms.find(room => room.type === 'Double');
const availableRoom = body.rooms[0]; // Assuming you want the first available room
expect(availableRoom).toBeDefined();
const roomId = availableRoom.roomid;
const roomName = availableRoom.roomName;
const roomType = availableRoom.type;
console.log('Available room type:', roomType);
console.log('Available room ID:', roomId);
console.log('Available room name:', roomName);

const bookingPayload = {
    roomid: roomId,
    firstname: 'Ram',
    lastname: 'Playwright',
    depositpaid: true,
    email: 'test@example.com',
    phone: '07123456789',
    bookingdates: {
        checkin: checkinDate,
        checkout: checkoutDate
    }
};      

const bookingResponse = await request.post('https://automationintesting.online/api/booking', {
    data: bookingPayload

})
expect(bookingResponse.status()).toBe(201);
//console.log('Booking status:', bookingResponse.status());
const bookingBody = await bookingResponse.json();   
//console.log('Booking response:', bookingBody);
expect(bookingBody.bookingid).toBeDefined();
const bookingId = bookingBody.bookingid;
console.log('Booking ID:', bookingId);

await page.goto('https://automationintesting.online/');
const weekday = checkin.toLocaleDateString('en-GB', { weekday: 'long' });
const dayMonth = checkin.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });

const checkinUiDate = `${weekday}, ${dayMonth}`;
console.log('Check-in UI date:', checkinUiDate);

const checkoutWeekday = checkout.toLocaleDateString('en-GB', { weekday: 'long' });
const checkoutDayMonth = checkout.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
const checkoutUiDate = `${checkoutWeekday}, ${checkoutDayMonth}`;
console.log('Check-out UI date:', checkoutUiDate);


await page.getByRole('textbox').first().click();

await page.getByRole('gridcell', {
    name: `Choose ${checkinUiDate}`
}).click();
await page.getByRole('textbox').nth(1).click();

await page.getByRole('gridcell', {
    name: `Choose ${checkoutUiDate}`
}).click();

await page.getByRole('button', {
    name: 'Check Availability'
}).click();
const roomCard = page.locator('.room-card').filter({
    hasText: roomType
});
await roomCard.getByRole('link', {
    name: 'Book now'
}).click();
try {
    await expect(page.getByText('Selected')).toBeVisible();
}
finally {
    console.log('Cleaning up booking:', bookingId);

    const deleteResponse = await request.delete(
        `https://automationintesting.online/api/booking/${bookingId}`
    );

    expect(deleteResponse.status()).toBe(200);
}
//console.log(await page.locator('body').innerText());

})



   

    
    




