//
//  LoveChatEntry.h
//  candpiosapp
//
//  Created by Stephen Birarda on 5/9/12.
//  Copyright (c) 2012 Coffee and Power Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "User.h"
#import "VenueChatEntry.h"

#define LOVE_SYSTEM_CHAT_TYPE @"review"

@interface LoveChatEntry : VenueChatEntry

@property (nonatomic, strong) User *recipient;
@property (nonatomic, assign) int reviewID;
@property (nonatomic, strong) NSMutableDictionary *plusOnes;

- (LoveChatEntry *)initFromJSON:(NSDictionary *)json 
                  dateFormatter:(NSDateFormatter *)dateFormatter;


@end
