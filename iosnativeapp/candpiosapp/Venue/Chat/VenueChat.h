//
//  VenueChat.h
//  candpiosapp
//
//  Created by Stephen Birarda on 4/16/12.
//  Copyright (c) 2012 Coffee and Power Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

// interval of number of seconds for chat reload
#define VENUE_CHAT_RELOAD_INTERVAL 10

// interval of number of days to go back to count active users
#define VENUE_CHAT_ACTIVE_INTERVAL 7

@interface VenueChat : NSObject

@property (nonatomic, assign) int venueID;
@property (nonatomic, assign) int lastChatID;
@property (nonatomic, strong) NSArray *chatEntries;
@property (nonatomic, strong) NSDateFormatter *entryDateFormatter;
@property (nonatomic, assign) int activeChattersDuringInterval;
@property (nonatomic, strong) NSOperationQueue *chatQueue;
@property (nonatomic, assign) BOOL hasLoaded;
@property (nonatomic, strong) NSDateFormatter *timestampDateFormatter;
@property (nonatomic, strong) NSDate *pendingTimestamp;
@property (nonatomic, strong) NSMutableArray *entryPurgatory;

-(VenueChat *)initWithVenueID:(int)venueID;

- (void)getNewChatEntriesWithCompletion:(void (^)(BOOL authenticated,NSArray *newEntries))completion;
- (void)addNewChatEntriesFromDictionary:(NSDictionary *)dict 
                             completion:(void (^)(NSArray *newEntries))completion;



@end
