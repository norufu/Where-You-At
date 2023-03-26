from os import listdir
import os
from os.path import isfile, join
import json
from os import walk

filePathP1 = r'D:\Programs\Projects\Where were you at 2\where\src\Location History\Semantic Location History\\'
filePathP2 = r'D:\Programs\Projects\Where were you at 2\where\src\Location History\p2\\'

def getFiles(filePath): 
    f = []
    for (dirpath, dirnames, filenames) in walk(filePath):
        if('Records.json' in filenames or len(filenames) <=0): #skips the first two folders
            continue
        else: #add data to file list
            f.extend(filenames)
    return(f)


def sortData(fileList, filePath, player):
    #used to get `activitySegment` and `PlaceVisit` and compile a list
    tempData = [[],[]]
    for file in fileList:
        print(file)
        year = file[:4]

        # Load file
        jsonData = (json.load(open(os.path.join(filePath, year, file), encoding='utf-8')))['timelineObjects']
        for log in jsonData:

            if('activitySegment' in log.keys()):
                tempData[0].append(log)
            elif('placeVisit' in log.keys()):
                tempData[1].append(log)

    return(tempData)

        # "placeId": "ChIJWVmSGEiLK4gRiwjdjgm3sLI",
        # "address": "Stanley Park Mall, 1005 Ottawa Street North, Kitchener, Ontario N2A 1H2, Canada",
        # "name": "Stanley Park Mall",
def getUniquePlaces(data):
    tempData = []
    count = 0
    for place in data:
        if(len(tempData) == 0):
            place['timesWent'] = 1
            tempData.append(place)
            continue
        isLogged = False
        for loggedPlace in tempData:
            if(loggedPlace['placeVisit']['location']['placeId'] == place['placeVisit']['location']['placeId']):
                loggedPlace['timesWent'] += 1 
                isLogged = True
                # print(loggedPlace['placeVisit']['location']['placeId'] + '\n' + place['placeVisit']['location']['placeId'])
                

        if(not isLogged):
            place['timesWent'] = 1
            tempData.append(place)
            

        count+=1
    print('\n\n')
    print(len(tempData))
    return(tempData)

def mergeSort(arr):
    if len(arr) > 1:
  
         # Finding the mid of the array
        mid = len(arr)//2
  
        # Dividing the array elements
        L = arr[:mid]
  
        # into 2 halves
        R = arr[mid:]
  
        # Sorting the first half
        mergeSort(L)
  
        # Sorting the second half
        mergeSort(R)
  
        i = j = k = 0
  
        # Copy data to temp arrays L[] and R[]
        while i < len(L) and j < len(R):
            if L[i]['timesWent'] >= R[j]['timesWent']:
                arr[k] = L[i]
                i += 1
            else:
                arr[k]= R[j]
                j += 1
            k += 1
  
        # Checking if any element was left
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
  
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1

def comparePlaces(p1Places, p2Places):
    sharedExactPlaces = [] #exact by id
    sharedNamePlaces = [] #shared by name
    for p1 in p1Places:
        for p2 in p2Places:
            if('name' in p2['placeVisit']['location'] and 'name' in p1['placeVisit']['location']): #check exact location by ID
                if(p1['placeVisit']['location']['name'] == p2['placeVisit']['location']['name'] and p1 not in sharedNamePlaces):
                    
                   sharedNamePlaces.append(p1)
            if(p1['placeVisit']['location']['placeId'] == p2['placeVisit']['location']['placeId']): #check location names rather than exact location
                sharedExactPlaces.append(p1)
                break
    return(sharedExactPlaces)

#precision values
#.1 = 11.1km
#.01 = 1.1km
#0.001 = 110m

def isClose(p1Loc, p2Loc, precision): #[2] = long, [3] = lat
    if(abs(p1Loc[2] - p2Loc[2]) < precision and abs(p1Loc[3] - p2Loc[3]) < precision):
        print('they were close!')
        return True
    return False


def activitySegmentTest(p1ActivityData, p2ActivityData, precision):
    print("\n")
    p1BoxedData = []
    p2BoxedData = []
    sharedSegments = []

    for activity in p1ActivityData: #should be naturally sorted by date
        p1BoxedData.append([activity['activitySegment']['duration']['startTimestamp'], activity['activitySegment']['duration']['endTimestamp'], activity['activitySegment']['startLocation']['latitudeE7'], activity['activitySegment']['startLocation']['longitudeE7']])
        p1BoxedData.append([activity['activitySegment']['duration']['startTimestamp'], activity['activitySegment']['duration']['endTimestamp'], activity['activitySegment']['endLocation']['latitudeE7'], activity['activitySegment']['endLocation']['longitudeE7']])

    for activity in p2ActivityData: #should be naturally sorted by date
        p2BoxedData.append([activity['activitySegment']['duration']['startTimestamp'], activity['activitySegment']['duration']['endTimestamp'], activity['activitySegment']['startLocation']['latitudeE7'], activity['activitySegment']['startLocation']['longitudeE7']])
        p2BoxedData.append([activity['activitySegment']['duration']['startTimestamp'], activity['activitySegment']['duration']['endTimestamp'], activity['activitySegment']['endLocation']['latitudeE7'], activity['activitySegment']['endLocation']['longitudeE7']])

    #go through each, check 
    #p1.date == p2.date?
    #elif p1.date < p2.date?
    #else p1 date is past, move to next

    p1Index = 0
    p2Index = 0
    print(len(p1BoxedData), len(p2BoxedData), " LENGTHS")
    while p1Index < len(p1BoxedData):
        
        if(p1BoxedData[p1Index][0][:9] == p2BoxedData[p2Index][0][:9] or p1BoxedData[p1Index][1][:9] == p2BoxedData[p2Index][0][:9]): #checks the start/end time to see if it matches p2 start day
            #check if they were close
            if(isClose(p1BoxedData[p1Index], p2BoxedData[p2Index], precision)):
                sharedSegments.append([p1BoxedData[p1Index], p2BoxedData[p2Index]])

        elif(p1BoxedData[p1Index][1][:9] > p2BoxedData[p2Index][0][:9]): #if p1 is past p2, increment p2 and skip p1 increment
            p2Index+=1
            continue

        p1Index+=1

    return sharedSegments
    # for p1a in p1BoxedData:

    #     for p2a in p2BoxedData: #[0] = start, [1] = end, [:7] slices date to 'YYYY-MM-DD' format
    #         if(p1a[0][:7] == p2a[0][:7] or p1a[1][:7] == p2a[0][:7]): #checks the start/end time to see if it matches p2 start day
    #             print(p1a[0], p2a[0], ' same day')
    #             continue
    #         elif(p1a[1][:7] > p2a[0][:7]): #if p1a is past, break 
    #             break



    # print('')


p1Files = getFiles(filePathP1)
p2Files = getFiles(filePathP2)
p1Data = sortData(p1Files, filePathP1, 1)
p2Data = sortData(p2Files, filePathP2, 2)

p1UniqueLocations = getUniquePlaces(p1Data[1])
p2UniqueLocations = getUniquePlaces(p2Data[1])

# 35774|7544 
sharedSegments = activitySegmentTest(p1Data[0], p2Data[0], 10000)
print(sharedSegments)
#sort locations
# mergeSort(p1UniqueLocations)
# mergeSort(p2UniqueLocations)


# for i in range(700):
#     if('name' in p2UniqueLocations[i]['placeVisit']['location']):
#         print(p2UniqueLocations[i]['placeVisit']['location']['name'], p2UniqueLocations[i]['timesWent'])
#     elif('address' in p2UniqueLocations[i]['placeVisit']['location']):
#         print(p2UniqueLocations[i]['placeVisit']['location']['address'], p2UniqueLocations[i]['timesWent'])
#     else:
#         print(p2UniqueLocations[i]['placeVisit']['location'], p2UniqueLocations[i]['timesWent'])

# sharedPlaces = comparePlaces(p1UniqueLocations, p2UniqueLocations)

# for p in sharedPlaces:
#     if('name' in p['placeVisit']['location']):
#         print(p['placeVisit']['location']['name'])
#     elif('address' in p['placeVisit']['location']):
#         print(p['placeVisit']['location']['address'])
#     else:
#         print(p['placeVisit']['location'])

# print(p1Data)
# print(len(p1Data[0]), len(p1Data[1]))
# print(len(p2Data[0]), len(p2Data[1]))

